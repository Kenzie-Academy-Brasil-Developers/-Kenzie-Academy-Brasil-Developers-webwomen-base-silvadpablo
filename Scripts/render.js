function renderStickyNone () {
    let ul = document.getElementById("selected-positions")
    let li = document.createElement("li")
    li.id = "aside-none"
    ul.append(li)

    let p = document.createElement("p")
    p.classList = "card-aside-text-none"
    p.innerText = "Você ainda não aplicou para nenhuma vaga"
    li.append(p)

    let divTop = document.createElement("div")
    divTop.classList = "card-empty-bars card-empty-bar-top"
    li.append(divTop)

    let divMiddle = document.createElement("div")
    divMiddle.classList = "card-empty-bars card-empty-bar-middle"
    li.append(divMiddle)

    let divFlex = document.createElement("div")
    divFlex.classList = "flex"
    li.append(divFlex)

    let divBottomLeft = document.createElement("div")
    divBottomLeft.classList = "card-empty-bars card-empty-bar-bottom-left"
    divFlex.append(divBottomLeft)
    
    let divBottomMiddle = document.createElement("div")
    divBottomMiddle.classList = "card-empty-bars card-empty-bar-bottom-middle"
    divFlex.append(divBottomMiddle)

    let divBottomRight = document.createElement("div")
    divBottomRight.classList = "card-empty-bars card-empty-bar-bottom-right"
    divFlex.append(divBottomRight)
}
renderStickyNone()


function renderPosition () {
    let allPositions = document.getElementById("all-positions")

    jobsData.forEach(element => {
        let {id, title, enterprise, location, description, modalities} = element
        
        let li = document.createElement("li")
        li.classList = "card"
        li.id = `position-${id}`
        allPositions.append(li)
    
        let h4 = document.createElement("h4")
        h4.classList = "card-title"
        h4.innerText = title
        li.append(h4)

        let divType = document.createElement("div")
        divType.classList = "flex"
        li.append(divType)
        
        let pCompany = document.createElement("p")
        pCompany.classList = "card-type-text"
        pCompany.innerText = enterprise
        
        
        let pLocation = document.createElement("p")
        pLocation.classList = "card-type-text"
        pLocation.innerText = location
        divType.append(pCompany, pLocation)
        
        let pDescription = document.createElement("p")
        pDescription.classList = "card-description"
        pDescription.innerText = description
        li.append(pDescription)

        let divFooter = document.createElement("div")
        divFooter.classList = "flex justify-between"
        divFooter.id = `footer-${id}`
        li.append(divFooter)
        
        let divModalities = document.createElement("div")
        divModalities.classList = "flex justify-between items-center"
        divFooter.append(divModalities)

        element.modalities.forEach(element => {
            let buttonMods = document.createElement("button")
            buttonMods.classList = "btn btn-type"
            buttonMods.innerText = element
            divModalities.append(buttonMods)
        })

        let buttonAdd = document.createElement("button")
        buttonAdd.classList = "btn btn-default btn-small"
        buttonAdd.innerText = "Candidatar-se"
        buttonAdd.id = `button-add-${id}`
        divFooter.append(buttonAdd)
        
        
        buttonAdd.addEventListener("click", () => {
            let asidePosition = document.getElementById(`applied-${id}`)
            let asideNone = document.getElementById("aside-none")
            
            if (!asidePosition){
                renderSidePostion(id)
            }
            if(asideNone) {
                asideNone.remove()
            }
            event.target.remove()
            let buttonRemove = document.createElement("button")
            buttonRemove.classList = "btn btn-default btn-small"
            buttonRemove.innerText = "Remover candidatura"
            buttonRemove.id = `button-remove-${id}`
            divFooter.append(buttonRemove)
            buttonRemove.addEventListener("click", () => {
                switchButton(id)
                removeSidePosition(id)
            })
            
        })
    })
    
}
renderPosition(jobsData)

let stored = []

function removeSidePosition (id) {
    let sidePosition = document.getElementById(`applied-${id}`)
    
    let storedPosition = stored.indexOf(id)
    stored.splice(storedPosition, 1)
    localStorage.setItem("appliedPositions", stored)
    
    sidePosition.remove()
    let anyApplied = document.querySelector(".card-aside")
    if(!anyApplied){
        renderStickyNone()
    }
}

function renderSidePostion (id) {
    let filteredPosition = jobsData.filter((number) => number.id == id)
    let {title, enterprise, location} = filteredPosition[0]
    let ul = document.getElementById("selected-positions")

    let li = document.createElement("li")
    li.classList = "card-aside"
    li.id = `applied-${id}`
    ul.append(li)

    let divTitle = document.createElement("div")
    divTitle.classList = "flex justify-between"
    li.append(divTitle)

    let h5 = document.createElement("h5")
    h5.classList = "aside-title"
    h5.innerText = title
    divTitle.append(h5)

    let button = document.createElement("button")
    button.classList = "btn btn-icon"
    divTitle.append(button)
    button.addEventListener("click", () => {
        removeSidePosition(id)
        switchButton(id)
    })

    let divType = document.createElement("div")
    divType.classList = "flex"
    li.append(divType)

    let pCompany = document.createElement("p")
    pCompany.classList = "card-aside-type-text"
    pCompany.innerText = enterprise
    divType.append(pCompany)

    let pLocation = document.createElement("p")
    pLocation.classList = "card-aside-type-text"
    pLocation.innerText = location
    divType.append(pLocation)

    let previousStorage = localStorage.getItem("appliedPositions")
    if (previousStorage == null) {
        localStorage.setItem("appliedPositions", id)
        stored.push(JSON.parse(localStorage.getItem("appliedPositions")))
    } else {
        let nextStorage = [...stored, id]
        localStorage.setItem("appliedPositions", nextStorage)
        stored = [...nextStorage]
    }
}

function switchButton (id) {
    let removeButton = document.getElementById(`button-remove-${id}`)
    removeButton.remove()
    let divFooter = document.getElementById(`footer-${id}`)
    let buttonAdd = document.createElement("button")
    buttonAdd.classList = "btn btn-default btn-small"
    buttonAdd.innerText = "Candidatar-se"
    buttonAdd.id = `button-add-${id}`
    divFooter.append(buttonAdd)

    buttonAdd.addEventListener("click", () => {
        let asidePosition = document.getElementById(`applied-${id}`)
        let asideNone = document.getElementById("aside-none")
        if (!asidePosition){
            renderSidePostion(id)
        }
        if(asideNone) {
            asideNone.remove()
        }
        event.target.remove()
        let buttonRemove = document.createElement("button")
        buttonRemove.classList = "btn btn-default btn-small"
        buttonRemove.innerText = "Remover candidatura"
        buttonRemove.id = `button-remove-${id}`
        divFooter.append(buttonRemove)
        buttonRemove.addEventListener("click", () => {
            switchButton(id)
            removeSidePosition(id)
            event.target.remove()
        })
    })
}

function preRender () {
    let localStored = (localStorage.getItem("appliedPositions"))
    if (localStored != null) {
        let localFilterNonNumbers = localStored.replace(/\D/g, "")
        let localFilterString = [...localFilterNonNumbers]
        let toRender = localFilterString.map((element) => parseInt(element))
        toRender.forEach(element => {
            renderSidePostion(element)
            let asideNone = document.getElementById("aside-none")
            if(asideNone) {
                asideNone.remove()
            }
            let buttonAdd = document.getElementById(`button-add-${element}`)
            let footer = document.getElementById(`footer-${element}`)
            buttonAdd.remove()
            let buttonRemove = document.createElement("button")
            buttonRemove.classList = "btn btn-default btn-small"
            buttonRemove.innerText = "Remover candidatura"
            buttonRemove.id = `button-remove-${element}`
            footer.append(buttonRemove)
            buttonRemove.addEventListener("click", () => {
                switchButton(element)
                removeSidePosition(element)
                event.target.remove()
            })
        })
    }
}
preRender()