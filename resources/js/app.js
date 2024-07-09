import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
import moment from 'moment'

document.addEventListener('DOMContentLoaded', function() {

    let addToCart= document.querySelectorAll('.btn1')
    let itemCount= document.querySelector('#itemCount')
    function updateCart(food){
        axios.post('/updateCart',food).then (res=>{
            console.log(res);
            itemCount.innerText=res.data.totalQuantity;
            // new Noty({
            //     type:'success',
            //     text:'Item added'
            // }).show();
        })
    }
    
    addToCart.forEach((addBtn)=>{
          addBtn.addEventListener('click',(e)=>{
              let food=JSON.parse(addBtn.dataset.add);
              // console.log(e);
              // console.log(addBtn);
              console.log(food);
              updateCart(food);
  
          })
      })
    const alertMsg=document.querySelector('#success-alert')
    if(alertMsg)
    {
        console.log("alertMsg");
        setTimeout(()=>{
            alertMsg.remove()
        },2000)
    }

  initAdmin();
  //orderTrack
  let all_status=document.querySelectorAll('.status-line')
  let hidden_status=document.querySelector('#hidden_status')
  let order= hidden_status ? hidden_status.value : null;
  order=JSON.parse(order);
  console.log(order);
  console.log(all_status);
  let time= document.createElement('small');

  function updateOrderStatus(order){
    let completed=true;
    all_status.forEach((status)=>{
        let fetched_status=status.dataset.status;
        if(completed)
        {
            status.classList.add('completed');
        }
        if(fetched_status === order.status)
        {
            completed=false;
            time.innerText=moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time);
            if(status.nextElementSibling)
            {
                status.nextElementSibling.classList.add('current');
            }
        }
    })

  }
  updateOrderStatus(order)
  });