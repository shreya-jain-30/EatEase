import axios from 'axios'
import moment from 'moment'

export function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin-order', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p style="color:green;">${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
      }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">
                    <p style="color:red;">${ order._id }</p>
                    <div>${ renderItems(order.items) }</div>
                </td>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">${ order.customerId.name }</td>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">${ order.address }</td>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">
                    <div >
                        <form action="/admin-order/status" method="post">
                            <input type="hidden" name="orderId" value="${ order._id }">
                            <select name="status" onchange="this.form.submit()" style="display:flex;justify-content:center;align-items:center;border:2px solid rgb(190, 215, 248);width:80%">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed
                                </option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed
                                </option>
                                <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                    Prepared
                                </option>
                                <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>
                        </form>
                    </div>
                </td>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">
                    ${ moment(order.createdAt).format('hh:mm A') }
                </td>
                <td style="background-color: white;padding-left:10px;height:1.5rem;border:1px solid rgb(119, 118, 118);">
                    ${ order.paymentStatus ? 'paid' : 'Not paid' }
                </td>
            </tr>
        `
        }).join('')
    }
}
