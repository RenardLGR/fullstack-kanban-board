import DropZone from "./DropZone.js"

export default class ExistingItem{
    constructor(div, colTitle){

        const bottomDropZone = DropZone.createDropZone()

        this.elements = {}
        this.elements.colTitle = colTitle
        this.elements.root = div
        this.elements.input = this.elements.root.querySelector(".kanban__item-input")
        // this.elements.root.dataset.id
        // this.elements.input.textContent = content
        this.content = this.elements.input.textContent

        this.elements.root.appendChild(bottomDropZone) //append our dropzone to our elements

        const onBlur = async () => { //when we click away from the input box of a new/edit item //when focus is lost
        //if the content has changed, update local storage
            const newContent = this.elements.input.textContent.trim()

            if(newContent === this.content) {
                return
            }

            this.content = newContent
            try{
                let itemId = this.elements.root.dataset.id
                console.log(itemId, this.content)
                const response = await fetch('/editItem', {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        itemId: itemId,
                        description: this.content,
                    })
                })
                const data = await response.json()
                console.log(data)
                // location.reload()
            }catch(err){
                console.log(err)
            }
        }

        this.elements.input.addEventListener('blur', onBlur)//when click away from the input event

        this.elements.root.addEventListener('dblclick', async () => { //deleting item by double clicking
            const check = confirm("Are you sure you want to delete this task")

            if(check){ //if ok/confirm was clicked
                const itemId = this.elements.root.dataset.id
                try{
                    const response = await fetch('/deleteItem', {
                        method: 'DELETE',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({
                            itemId: itemId
                        })
                    })
                    const data = await response.json()
                    console.log(data)
                }catch(err){
                    console.log(err)
                }

                this.elements.input.removeEventListener("blur", onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root) //user interface call
            }

        })//when double click the input event //double click will delete the item

        this.elements.root.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", this.elements.root.dataset.id)
            //send itemId to the data transfer, data received in DropZone.js
        })

        this.elements.input.addEventListener("drop", (event) => {
            event.preventDefault()
        })
    }
}