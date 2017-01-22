import _ from 'lodash'

Users = new Mongo.Collection('users')
Contracts = new Mongo.Collection('contracts')
Orders = new Mongo.Collection('orders')
Payments = new Mongo.Collection('payments')

Payments.addLinks({
  user: {
    type: 'one',
    collection: Users,
    field: 'userId',
    index: true,
  },

  contract: {
    type: 'one',
    collection: Contracts,
    field: 'contractId',
    index: true,
  }
})

Orders.addLinks({
  user: {
    type: 'one',
    collection: Users,
    field: 'userId',
    index: true,
  },

  contract: {
    type: 'one',
    collection: Contracts,
    field: 'contractId',
    index: true,
  }
})

Contracts.addLinks({
  user: {
    type: 'one',
    collection: Users,
    field: 'userId',
    index: true,
  },

  orders: {
    collection: Orders,
    inversedBy: 'contract',
  },

  payments: {
    collection: Payments,
    inversedBy: 'contract',
  },
})

Contracts.addReducers({
  totalOrdersAmount: {
    body: {
      orders: {
        amount: 1,
      }
    },
    reduce(doc) {
      return _.sumBy(doc.orders, 'amount')
    }
  },

  totalPaymentsAmount: {
    body: {
      payments: {
        amount: 1,
      }
    },
    reduce(doc) {
      return _.sumBy(doc.payments, 'amount')
    }
  }
})

const Collections = [Users, Contracts, Orders, Payments]

const user = {
  _id: Random.id(),
  name: 'zhang hong',
}

const contract = {
  userId: user._id,
  _id: Random.id(),
  name: 'contract1',
}

const orders = _.times(5, n => ({
  userId: user._id,
  contractId: contract._id,
  amount: _.random(2000),
}))

const payments = _.times(5, n => ({
  userId: user._id,
  contractId: contract._id,
  amount: _.random(2000),
}))

if (Meteor.isServer) {
  _.each(Collections, collection => {
    collection.expose()
    collection.remove({})
  })

  Users.insert(user)
  Contracts.insert(contract)
  Orders.batchInsert(orders)
  Payments.batchInsert(payments)
}
