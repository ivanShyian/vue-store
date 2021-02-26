export function pay(total, cart, email) {
  // eslint-disable-next-line no-undef
  const widget = new cp.CloudPayments()
  return new Promise((resolve, reject) => {
    widget.pay('charge',
      { //  options
        publicId: 'test_api_00000000000000000000001',
        description: 'Оплата товаров в VueStore',
        amount: total,
        currency: 'RUB',
        accountId: email,
        skin: 'modern',
        data: cart
      },
      {
        onSuccess(options) { // success
          resolve(options)
        },
        onFail(reason) { // fail
          reject(reason)
        }
      }
    )
  })
}
