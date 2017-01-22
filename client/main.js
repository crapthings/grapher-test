Tracker.autorun(() => {

  const query = Contracts.createQuery({
    totalOrdersAmount: 1,
    totalPaymentsAmount: 1,
    user: {
      name: 1,
    },
  })

  if (query.subscribe().ready()) {
    const data = query.fetch()
    console.log(JSON.stringify(data, null, 4))
  }

})
