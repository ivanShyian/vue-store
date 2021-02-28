<template>
  <transition name="confirm-trans"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut">
    <teleport to="body">
      <app-confirm v-if="confirm"
                   title="Изменить заказ?"
                   @confirm="submit"
                   @denied="onCancel"></app-confirm>
    </teleport>
  </transition>
  <app-loading v-if="loading"></app-loading>
  <div class="card order" v-else-if="hasData">
    <div class="order__wrapper">
      <div class="order__left">
        <p>Сведения о заказе</p>
        <span><b>Уникальный номер:</b> {{ order.id }}</span>
        <span><b>Дата заказа:</b> {{ parseDate(order.date) }}</span>
        <span><b>Имя заказчика:</b> {{ order.name }}</span>
        <span><b>Email заказчика:</b> {{ order.email }}</span>
        <span><b>Статус:</b> {{ statusTitle(order.status) }}</span>
        <span><b>Сумма:</b> {{ order.total }} руб</span>
      </div>
      <div class="order__right">
        <p>Заказанные товары</p>
        <ul class="order__list">
          <li>
            <span><b>№</b></span>
            <span><b>Наименование</b></span>
            <span><b>Количество</b></span>
          </li>
          <li v-for="(p, idx) in list" :key="p.product">
            <span>{{ idx + 1 }}</span>
            <span>{{ p.product }}</span>
            <span>{{ p.count }} ед</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="order__actions">
      <button class="btn warning" @click="deleteOrder">Удалить</button>
      <button class="btn" :disabled="status === 'done'"
              @click="confirm = true">{{ buttonTitle(status) }}
      </button>
    </div>
  </div>
  <div class="card text-center" v-else>
    <h3>Заказа с номером "{{ $route.params.id }}" не существует</h3>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { parseDate } from '@/utils/parse-date'
import { buttonTitle, statusTitle } from '@/utils/order-status-label'
import AppLoading from '@/components/ui/AppLoading'
import AppConfirm from '@/components/ui/AppConfirm'
import { useConfirm } from '@/use/confirm'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const deleteAction = ref(false)
    const order = computed(() => store.getters['orders/oneOrder'](route.params.id))
    const hasData = computed(() => !loading.value && order.value)
    const list = computed(() => Object.keys(order.value.list).map(i => order.value.list[i]))
    const status = computed(() => order.value.status ? order.value.status : null)
    const {
      flag,
      confirm,
      submit
    } = useConfirm(true)

    const deleteOrder = () => {
      deleteAction.value = true
      confirm.value = true
    }
    const onCancel = () => {
      confirm.value = false
      deleteAction.value = false
    }

    watch(flag, response => {
      if (response && deleteAction.value) {
        store.dispatch('orders/deleteOrder', route.params.id)
        store.dispatch('alert/doAlert', {
          type: 'primary',
          text: 'Заказ был успешно удален'
        })
        router.replace({ name: 'AdminOrders' })
      } else {
        if (response && !status.value) {
          store.dispatch('orders/changeOrderStatus', {
            status: 'performing',
            id: route.params.id
          })
        } else if (response && status.value === 'performing') {
          store.dispatch('orders/changeOrderStatus', {
            status: 'done',
            id: route.params.id
          })
        }
      } // to archive function will be provided later
    })

    onMounted(async () => {
      loading.value = true
      await store.dispatch('orders/loadOrders')
      loading.value = false
    })
    return {
      buttonTitle,
      statusTitle,
      parseDate,
      deleteOrder,
      submit,
      onCancel,
      hasData,
      loading,
      confirm,
      order,
      status,
      list
    }
  },
  components: {
    AppConfirm,
    AppLoading
  }
}
</script>

<style scoped lang="scss">
.order {
  &__wrapper {
    display: flex;
    margin: 0 0 1rem 0;
  }

  &__left {
    display: flex;
    flex: 0 0 50%;
    flex-direction: column;
    border-right: 2px solid rgba(0, 0, 0, .2);

    p {
      font-size: 1.2rem;
      font-weight: 700;
      text-align: center;
    }

    span {
      margin-bottom: 1rem;
    }
  }

  &__right {
    display: flex;
    flex: 0 0 50%;
    flex-direction: column;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin: 0 0 .5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        padding: 0 0 .5rem .5rem;

        span {
          text-align: center;
          flex: 0 0 37%;
        }

        span:first-child {
          text-align: left;
          flex: 0 0 25%;
        }
      }

      li:first-child {
        border-bottom: 1px solid rgba(0, 0, 0, .3);
      }

      li:last-child {
        border: 0;
      }
    }

    p {
      font-size: 1.2rem;
      font-weight: 700;
      text-align: center;
    }
  }

  &__actions {
    border-top: 2px solid rgba(0, 0, 0, .2);
    padding: 1rem 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
