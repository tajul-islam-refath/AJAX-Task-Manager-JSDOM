// const axios = require('axios');
import axios from 'axios'

// URL = 'https://jsonplaceholder.typicode.com/users'
// let button = document.querySelector('#btn')
// let p = document.querySelector('#p')

// button.addEventListener('click', function() {
//     Axios.get(URL)
//         .then(res => {
//             res.data.forEach(user => {

//                 p.innerHTML = `${p.innerHTML}<br> Name : ${user.name}`

//             })
//         })
//         .catch(err => console.log(err))
// })

const URL = 'http://localhost:3000/contact'

window.onload = function() {
    let tbody = document.querySelector('#tbody')
    axios.get(URL)
        .then(res => {
            res.data.forEach(function(contact) {
                createTd(contact, tbody)
            })
        })
        .catch(err => console.log(err))

    let saveButton = document.querySelector('#Save-btn')
    saveButton.addEventListener('click', function() {
        createNewContact()
    })
}

// create new contact

function createNewContact() {
    let nameFild = document.querySelector('#nameFild')
    let phnFild = document.querySelector('#phnFild')
    let emailFild = document.querySelector('#emailFild')

    let object = {
        name: nameFild.value,
        phone: phnFild.value,
        email: emailFild.value
    }
    axios.post(URL, object)
        .then(function(res) {
            let tbody = document.querySelector('#tbody')
            createTd(res.data, tbody)

            nameFild.value = ''
            phnFild.value = ''
            emailFild.value = ''

        })
        .catch(err => console.log(err))
}

function createTd(contact, parent) {

    let tr = document.createElement('tr')

    const tdName = document.createElement('td')
    tdName.innerHTML = contact.name
    tr.appendChild(tdName)
    const tdPhone = document.createElement('td')
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A'
    tr.appendChild(tdPhone)
    const tdEmail = document.createElement('td')
    tdEmail.innerHTML = contact.email ? contact.email : 'N/A'
    tr.appendChild(tdEmail)
    const tdAction = document.createElement('td')



    const editButton = document.createElement('button')
    editButton.className = 'btn btn-warning mx-1'
    editButton.innerHTML = 'Edit'

    editButton.addEventListener('click', function() {
        let mainModal = $('#Modal')
        mainModal.modal('toggle')

        let editName = document.querySelector('#editName')
        let editPhn = document.querySelector('#editPhn')
        let editEmail = document.querySelector('#editEmail')

        editName.value = contact.name
        editPhn.value = contact.phone ? contact.phone : ''
        editEmail.value = contact.email ? contact.email : ''

        let updateBtn = document.querySelector('#updateButton')
        updateBtn.addEventListener('click', function() {
            axios.put(`${URL}/${contact.id}`, {
                    name: editName.value,
                    phone: editPhn.value,
                    email: editEmail.value

                })
                .then(res => {
                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email

                    mainModal.modal('hide')
                })
                .catch(err => console.log(err))
        })
    })
    tdAction.appendChild(editButton)


    const deletButton = document.createElement('button')
    deletButton.className = 'btn btn-danger'
    deletButton.innerHTML = 'Delete'

    //delete methode
    deletButton.addEventListener('click', function() {
        axios.delete(`${URL}/${contact.id}`)
            .then(function(res) {
                parent.removeChild(tr)
            })
            .catch()
    })
    tdAction.appendChild(deletButton)


    tr.appendChild(tdAction)
    parent.appendChild(tr)
}