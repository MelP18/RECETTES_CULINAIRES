/*===================================> MENU ACTIVE <===================================*/
const menuItem = document.querySelectorAll('.header__menu__list__item a')
if (menuItem) {
    menuItem.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault()
            const menuItemActive = document.querySelector('.header__menu__list__item a.active')
            if (!element.classList.contains('active')) {
                element.classList.add('active')
                menuItemActive.classList.remove('active')
            } else {
                element.classList.remove('active')
                menuItemActive.classList.add('active')
            }
        })

    })
}

/*==================================> CATEGORY OF MEAL <=================================*/
async function receiveCategoryMeal() {
    //console.log('bien');
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let jsonData = await data.json()
    const categoryPagination = document.querySelector('.category__pagination')
    const catList = document.querySelector('.category__meal__list')
    catList.innerHTML = ''
    if (jsonData.categories && jsonData.categories.length > 0) {
        let categorie = jsonData.categories
        //console.log(categorie);
        let pageIndex = 0
        let itemsPage = 2

        /*==================================> PAGINATION GET ELEMENT MAX <===============================*/
        function getCat() {
            for (i = pageIndex * itemsPage; i < (pageIndex * itemsPage) + itemsPage; i++) {
                if (!categorie[i]) { break }
                const catItem =
                    `
                        <div class="category__meal__list__item">
                            <div class="category__meal__list__item__img">
                                <img src="${categorie[i].strCategoryThumb}" alt="">
                            </div>
                            <div class="category__meal__list__item__information">
                                <h4 class="category__name">${categorie[i].strCategory}</h4>
                                <p class="description">${categorie[i].strCategoryDescription}</p>
                            </div>
                            <div class="see__more__description__btn">
                                <button class="see__more__description" id=${categorie[i].idCategory}>Voir plus</button>
                            </div>
                        </div>
                    `
                catList.innerHTML += catItem
            }
            doPagination()
        }
        getCat()

        /*==================================> PAGINATION NUMBER <=================================*/
        function doPagination() {
            categoryPagination.innerHTML = ''
            for (let i = 0; i < (categorie.length / itemsPage); i++) {
                const page = document.createElement('div')
                page.innerHTML = i + 1;
                page.addEventListener('click', (e) => {
                    pageIndex = e.target.innerHTML - 1;
                    catList.innerHTML = ''
                    getCat()
                    seeMore()
                })
                if (i === pageIndex) {
                    page.style.padding = '1rem'
                    page.style.backgroundColor = 'rgb(171, 150, 130)'
                }
                categoryPagination.append(page)
            }
        }

        /*==================================> GET ALL CATEGORY AND MODAL <=================================*/
        const allCategory = document.getElementById('all-category')
        const allCatModal = document.querySelector('.all__category__modal')
        const allCatList = document.querySelector('.modal__all__list__category')
        if (allCategory) {
            allCategory.addEventListener('click', (e) => {
                e.preventDefault()
                categorie.forEach(item => {
                    const allCat =
                        `
                        <div class="category__meal__list__item">
                            <div class="category__meal__list__item__img">
                                <img src="${item.strCategoryThumb}" alt="">
                            </div>
                            <div class="category__meal__list__item__information">
                                <h4 class="category__name">${item.strCategory}</h4>
                                <p class="description">${item.strCategoryDescription}</p>
                            </div>
                            <div class="see__more__description__btn">
                                <button class="see__more__description" id=${item.idCategory}>Voir plus</button>
                            </div>
                        </div>
                        `
                    allCatList.innerHTML += allCat
                })
                allCatModal.style.display = 'block'
            })

            /*==================================> CLOSE MOADAL <==============================*/
            const closeModal = document.querySelector('.close__modal')
            if (closeModal) {
                closeModal.addEventListener('click', (e) => {
                    e.preventDefault()
                    allCatModal.style.display = 'none'
                    allCatList.innerHTML = ''
                })
            }
        }

        /*==================================> RETAIL OF ALL CATEGORY LIST <==============================*/
        if (catList) {
            if (allCategory.addEventListener('click', (e) => {
                e.preventDefault()
                seeMore()
            }));
        }

        function seeMore() {
            const seeMoreBtn = document.querySelectorAll('.see__more__description__btn button')
            const catRetailList = document.querySelector('.category__retail__list')
            const seeMoreModal = document.querySelector('.see__more')
            if (seeMoreBtn) {
                seeMoreBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault()
                        let btnId = btn.id
                        //console.log(btnId);
                        categorie.forEach(item => {
                            if (item.idCategory == btnId) {
                                //console.log(item);
                                const catRetail =
                                    `   
                                        <div class="category__retail__item">
                                            <div class="category__retail__item__img">
                                                <img src="${item.strCategoryThumb}" alt="">
                                            </div>
                                            <div class="category__retail__item__information">
                                                <h4 class="category__name">${item.strCategory}</h4>
                                                <p class="description">${item.strCategoryDescription}</p>
                                            </div>
                                        </div>
                                    `
                                //console.log(catRetail);
                                catRetailList.innerHTML = catRetail
                                seeMoreModal.classList.add('active')

                            }

                        })
                    })
                })
            }
            const closeModalDetail = document.querySelector('.see__more .close__modal')
            if (closeModalDetail) {
                closeModalDetail.addEventListener('click', (e) => {
                    e.preventDefault()
                    seeMoreModal.classList.remove('active')
                    catRetailList.innerHTML = ''
                })
            }
        } seeMore();
    }
}

const urlPathname = window.location.pathname
const urlTab = urlPathname.split('/')
const pageName = urlTab.pop()

if (pageName == "index.html" || pageName == "accueil.html") {
    receiveCategoryMeal()
}

if (pageName == "index.html") {
    const signUp = document.getElementById('sign-up')
    if (signUp) {
        signUp.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = `register.html`
        })
    }
    const login = document.getElementById('login')
    if (login) {
        login.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = `login.html`
        })
    }
}


if (pageName == 'register.html') {
    let sheet = document.querySelector('.register__inform')
    if (sheet) {

        /*=============================> SEE PASSWROD ICON <=======================*/
        const seePassword = document.querySelector('.insert__element span.mdi-eye.passw')
        console.log(seePassword);
        let pass = document.getElementById('password')
        const closePassword = document.querySelector('.insert__element span.mdi-eye-off.passw')
        seePassword.addEventListener('click', passWord)
        function passWord() {
            if (seePassword.classList.contains('active')) {
                seePassword.classList.remove('active')
                closePassword.classList.add('active')
                pass.type = 'text'
            }
            closePassword.addEventListener('click', () => {
                if (closePassword.classList.contains('active')) {
                    closePassword.classList.remove('active')
                    seePassword.classList.add('active')
                    pass.type = 'password'
                }
            })
        }

        /*=========================> SEE CONFIRMPASSWROD ICON <====================*/
        const seePasswordC = document.querySelector('.insert__element span.mdi-eye.confirm')
        console.log(seePassword);
        let cConfirmPass = document.getElementById('confirmpassword')
        const closePasswordC = document.querySelector('.insert__element span.mdi-eye-off.confirm')
        seePasswordC.addEventListener('click', passWordC)
        function passWordC() {
            if (seePasswordC.classList.contains('active')) {
                seePasswordC.classList.remove('active')
                closePasswordC.classList.add('active')
                cConfirmPass.type = 'text'
            }
            closePasswordC.addEventListener('click', () => {
                if (closePasswordC.classList.contains('active')) {
                    closePasswordC.classList.remove('active')
                    seePasswordC.classList.add('active')
                    cConfirmPass.type = 'password'
                }
            })
        }

        /*===========================> SUBMIT REGISTRATION <======================*/
        const submit = document.getElementById('submit__sign__up')
        let inscription = []
        submit.addEventListener('click', () => {
            let error = document.querySelector('.error__part p')
            let errorPart = document.querySelector('.error__part')
            const userName = document.getElementById('username').value
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            const confirmPassword = document.getElementById('confirmpassword').value
            //const photo = document.getElementById('photo').value
            //const photoSrc = photo.slice(12, photo.length)
            //console.log(photo)
            //console.log(photoSrc);

            function emailValid(email) {
                return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email)
            }

            /*  function passWordValid(password){
                 return /[a-zA-Z0-9._-]/.test(password)
             }  */

            if (userName == '' || email == '' || password == '' || confirmPassword == '') {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'Veuillez remplir tous les champs'
            } else if (!userName.match(/^[a-zA-z]/)) {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'le nom d\'utilisateur doit commencer par une lettre'
            } else if (userName.length < 3) {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'le nom d\'utilisateur doit avoir au moins trois (03) caractères'
            } else if (!emailValid(email)) {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'E-mail Invalid'
            }/* else if(!passWordValid(password)){
                    errorPart.classList.add('active')
                    error.classList.add('active')
                    error.innerHTML = 'Mot de passe trop faible'
                } */
            else if (password != confirmPassword) {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'Mot de passe non conforme'
            } else {
                error.classList.remove('active')
                error.innerHTML = ''
                errorPart.classList.remove('active')
                inscription = JSON.parse(localStorage.getItem('recipe')) ?? []
                if (inscription.length == 0) {
                    const registration = {
                        'username': userName,
                        'email': email,
                        //'photo': photoSrc,
                        'password': password
                    }
                    inscription.push(registration)
                    localStorage.setItem('recipe', JSON.stringify(inscription))
                } else {
                    const registration = {
                        'username': userName,
                        'email': email,
                        //'photo': photoSrc,
                        'password': password
                    }
                    inscription.push(registration)
                    localStorage.setItem('recipe', JSON.stringify(inscription))
                    console.log(inscription);
                }
                document.getElementById('username').value = ''
                document.getElementById('email').value = ''
                document.getElementById('password').value = ''
                document.getElementById('confirmpassword').value = ''
                //document.getElementById('photo').value = ''

                window.location.href = 'login.html'
            }
        })
    }
}

if (pageName == 'login.html') {

    /*============================> SEE PASSWROD ICON <========================*/
    const seePassword = document.querySelector('.insert__element span.mdi-eye')
    const closePassword = document.querySelector('.insert__element span.mdi-eye-off')
    let pass = document.getElementById('password-Connect')
    seePassword.addEventListener('click', passWord)
    function passWord() {
        if (seePassword.classList.contains('active')) {
            seePassword.classList.remove('active')
            closePassword.classList.add('active')
            pass.type = 'text'
        }
        closePassword.addEventListener('click', () => {
            if (closePassword.classList.contains('active')) {
                closePassword.classList.remove('active')
                seePassword.classList.add('active')
                pass.type = 'password'
            }
        })
    }

    /*===========================> VERIFY SUBMIT CONNECTION <======================*/
    let dataRecipeRecord = JSON.parse(localStorage.getItem('recipe'))
    console.log(dataRecipeRecord);
    let sheetConnection = document.querySelector('.login__inform')
    if (sheetConnection) {
        let connectionBtn = document.getElementById('connect')
        connectionBtn.addEventListener('click', (e) => {
            e.preventDefault()
            let bdUserConnectData
            let error = document.querySelector('.error__part p')
            let errorPart = document.querySelector('.error__part')
            let connectUsername = document.getElementById('username-Connect').value
            let connectPassword = document.getElementById('password-Connect').value

            if (connectUsername == '' || connectPassword == '') {
                errorPart.classList.add('active')
                error.classList.add('active')
                error.innerHTML = 'Veuillez remplir tous les champs'
            } else {
                errorPart.classList.remove('active')
                error.classList.remove('active')
                error.innerHTML = ''
                document.getElementById('username-Connect').value = ''
                document.getElementById('password-Connect').value = ''
                setTimeout(() => {
                    let unserConnect = dataRecipeRecord.filter(posts => posts.username === `${connectUsername}` && posts.password === `${connectPassword}`)
                    if (unserConnect.length == 0) {
                        errorPart.classList.add('active')
                        error.classList.add('active')
                        error.innerHTML = 'Données non valides'
                    } else {
                        const userConnect = {
                            'userName': connectUsername,
                            'passWord': connectPassword
                        }
                        bdUserConnectData = localStorage.setItem('userConnectData', JSON.stringify(userConnect))
                        window.location.href = ' accueil.html'
                        console.log(bdUserConnectData);
                    }
                }, 2000)
            }
        })
    }
}

/*==================================> CONTENT RIGHT <===================================*/
if (pageName == 'accueil.html') {

    /*===========================> RECOVER UNSERNAME <======================*/
    let getUerConnectData = []
    getUerConnectData.push(JSON.parse(localStorage.getItem('userConnectData')))
    console.log(getUerConnectData);
    getUerConnectData.forEach(item => {
        console.log(item.userName);
        const userPseudo = document.querySelector('.header__menu__list__one__item a h4')
        userPseudo.innerHTML = item.userName

    })

    /*================================> DISCONNECT <===================================*/
    const logOut = document.querySelector('.header__menu__list__two__item span.mdi-logout')
    logOut.addEventListener('click',()=>{
        const disconnect = document.querySelector('.disconnect')
        if(disconnect){
            
             if(!disconnect.classList.contains('active')){
                disconnect.classList.add('active')
                disconnect.addEventListener('click',()=>{
                    localStorage.removeItem('userConnectData')
                    window.open('index.html')
                })
            }else{
                disconnect.classList.remove('active')
            } 

        }
    })
    /*============================> MENU HAMBURGER <================================*/
    const menuHamburger = document.querySelector('.menu__hamburger')
    const menuTitle = document.querySelectorAll('.user__menu__list__item a h4')
    menuTitle.forEach(item => {
        menuHamburger.addEventListener('click', (e) => {
            e.preventDefault()
            item.classList.add('active')
            const blockLeft = document.querySelector('.block__left')
            const blockRight = document.querySelector('.block__right')
            const searchModal = document.querySelector('.search__modal')
            if (!menuHamburger.classList.contains('active')) {
                menuHamburger.classList.add('active')
                blockLeft.classList.add('active')
                blockRight.classList.add('active')
                searchModal.classList.add('active')
            } else {
                menuHamburger.classList.remove('active')
                blockLeft.classList.remove('active')
                blockRight.classList.remove('active')
                searchModal.classList.remove('active')
            }
        })
    })

    /*============================> MENU LEFT ACTIVE <================================*/
    const menuLeft = document.querySelectorAll('.user__menu__list__item a span')
    menuLeft.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const menuLeftActive = document.querySelector('.user__menu__list__item a span.active')
            if (!item.classList.contains('active')) {
                item.classList.add('active')
                menuLeftActive.classList.remove('active')
            } else {
                item.classList.remove('active')
                menuLeftActive.classList.add('active')
            }
            const menuActive = document.querySelector('.user__menu__list__item a span.active')
            if (menuActive) {
                const mainList = document.querySelectorAll('.main__content__list__item')
                mainList.forEach(mainItem => {
                    let menuItemId = mainItem.id
                    if (menuActive.classList.contains(menuItemId)) {
                        mainItem.classList.add('active')
                    } else {
                        mainItem.classList.remove('active')
                    }
                })
            }
        })
    })

    const menu = document.querySelectorAll('.user__menu__list .user__menu__list__item')
    if (menu) {
        menu.forEach(menuItem => {
            if (menuItem) {
                menuItem.addEventListener('click', (e) => {
                    e.preventDefault()
                    let menuActive = menuItem.getAttribute('data-menu')
                    if (menuActive) {
                        if (menuActive == 'menu2') {
                            /*======================>OPEN MODAL SEARCH======================*/
                            const search = document.querySelector('.user__menu__list__item a span.mdi-magnify')
                            const searchModal = document.querySelector('.recipe__search')
                            //search.addEventListener('click', (e) => {
                            // e.preventDefault()
                            searchModal.style.display = 'flex'
                            //})

                            /*======================>CLOSE MODAL SEARCH======================*/
                            const closeSearchModal = document.querySelector('.search__modal .close__modal')
                            closeSearchModal.addEventListener('click', (e) => {
                                e.preventDefault()
                                searchModal.style.display = 'none'
                            })

                            /*======================>RESULT SEARCH=====================*/
                            var btnSearch = document.querySelector('.search span.mdi-magnify')

                            async function receiveIngData() {
                                let searchText = document.getElementById('search-input').value.trim()
                                let ingData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
                                let ingDataJson = await ingData.json()
                                let searchNone = document.querySelector('.serach__result__list .result__none')
                                const mealList = document.querySelector('.serach__result__list')
                                mealList.innerHTML = ''
                                let mealItem = ""
                                if (ingDataJson.meals) {
                                    if (ingDataJson.meals.length > 0) {
                                        ingDataJson.meals.forEach(item => {
                                            mealItem +=
                                                `
                                                    <div class="serach__result__list__item" id='${item.idMeal}'>
                                                        <div class="meal__recipe">
                                                            <div class="meal__img">
                                                                <img src="${item.strMealThumb}" alt="">
                                                            </div>
                                                            <div class="meal__name">
                                                                <h4>${item.strMeal}</h4>
                                                            </div>
                                                            <div class="meal__see__more">
                                                                <button class="recipe__see__more">Voir plus</button>
                                                            </div>
                                                            <div class="actions">
                                                                <div class="action__left">
                                                                    <span class="mdi mdi-thumb-up-outline"></span>
                                                                    <span class="mdi mdi-thumb-up"></span>
                                                                    <span class="count"></span>
                                                                </div>
                                                                <span class="mdi mdi-content-save"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `
                                        })
                                        mealList.innerHTML = mealItem
                                        const recipeDetailbtn = document.querySelectorAll('.recipe__see__more')

                                        /*=============================> LIKE RECIPE <====================*/
                                        const like = document.querySelectorAll('.meal__recipe .actions span.mdi-thumb-up-outline')
                                        const count = document.querySelector('.actions .count')
                                        if (like) {
                                            like.forEach(likeItem => {
                                                let likeClick = 0
                                                likeItem.addEventListener('click', (e) => {
                                                    e.preventDefault()
                                                    likeClick += 1
                                                    if (!likeItem.classList.contains('active')) {
                                                        likeItem.classList.add('active')
                                                        let parentLike = likeItem.closest('.serach__result__list__item')
                                                        //console.log(parentLike);
                                                        let parentLikeId = parentLike.id
                                                        //console.log(parentLikeId);
                                                        let liked = parentLike.querySelector('span.mdi-thumb-up')
                                                        //count.innerHTML = likeClick
                                                        //console.log(liked);
                                                        if (liked) {
                                                            liked.classList.add('active')
                                                            liked.addEventListener('click', (e) => {
                                                                e.preventDefault()
                                                                //likeClick  = 0
                                                                //count.innerHTML = ''
                                                                liked.classList.remove('active')
                                                                likeItem.classList.remove('active')
                                                            })
                                                        }
                                                        //console.log(likeClick);
                                                    }
                                                })
                                            })
                                        }

                                        /*=============================> SAVE RECIPE <====================*/
                                        const save = document.querySelectorAll('.meal__recipe .actions span.mdi-content-save')
                                        //console.log(save);
                                        save.forEach(saveItem => {
                                            if (saveItem) {
                                                saveItem.addEventListener('click', () => {
                                                    let saveItemParent = saveItem.closest('.serach__result__list__item')
                                                    let saveItemParentId = saveItemParent.id
                                                    let parentSave = ingDataJson.meals.find(posts => (posts.idMeal === saveItemParentId))
                                                    let date = new Date()
                                                    let newDate = date.toLocaleString('fr-FR', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric'
                                                    })
                                                    let userDataSave = []
                                                    userDataSave = JSON.parse(localStorage.getItem('userSave')) ?? []

                                                    if (parentSave) {

                                                        if (userDataSave.length == 0) {
                                                            const save = {
                                                                'date': newDate,
                                                                'recipeSave': parentSave
                                                            }
                                                            userDataSave.push(save)
                                                            localStorage.setItem('userSave', JSON.stringify(userDataSave))
                                                            console.log(localStorage.setItem('userSave', JSON.stringify(userDataSave)));
                                                        } else {
                                                            const save = {
                                                                'date': newDate,
                                                                'recipeSave': parentSave
                                                            }
                                                            userDataSave.push(save)
                                                            //JSON.parse(localStorage.getItem('userSave'))
                                                            localStorage.setItem('userSave', JSON.stringify(userDataSave))
                                                        }

                                                    }

                                                })
                                            }

                                        })

                                        /*======================> BTN SEE MORE RESULT SEARCH====================*/
                                        recipeDetailbtn.forEach(item => {
                                            item.addEventListener('click', (e) => {
                                                e.preventDefault()

                                                let parentItem = item.closest('.serach__result__list__item')
                                                let dataDetailRecipe = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parentItem.id}`)
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        /* if (data.meals[0].strMeasu == "") {
                                                        } */
                                                        let html =
                                                            `
                                                                <div class="close__modal">
                                                                    <span></span>
                                                                </div>
                                                                <div class="recipe__detailed__top">
                                                                    <div class="recipe__detailed__img">
                                                                        <img src="${data.meals[0].strMealThumb}" alt="">
                                                                    </div>
                                                                    <div class="name__recipe__detailed">
                                                                        <h4>${data.meals[0].strMeal}</h4>
                                                                    </div>
                                                                </div>
                                                                <div class="recipe__detailed__bottom">
                                                                    <p>${data.meals[0].strInstructions}
                                                                        <a href="${data.meals[0].strYoutube}" target="_blank">Regarder
                                                                            la video</a>
                                                                    </p>
                                                                </div>
                                                                <div class="partager">
                                                                    <a href='#' id="btnShare">
                                                                    <span class="mdi mdi-share-variant-outline"></span>
                                                                    </a>
                                                                    <div class="partager__list">
                                                                    <a href="https://www.facebook.com/?wtsid=rdr_0xcyV5X7k0dKOZzUw" target='_blank'>
                                                                        <span class=" mdi mdi-facebook">
                                                                        </span>
                                                                    </a>
                                                                    <a href="https://web.whatsapp.com/">
                                                                        <span class="mdi mdi-whatsapp"></span>
                                                                    </a>
                                                                    <a href="https://www.instagram.com/accounts/login/">
                                                                        <span class="mdi mdi-instagram"></span>
                                                                    </a>
                                                                    <a href="https://twitter.com/intent/tweet?url=${data.meals[0].strMeal} ${data.meals[0].strYoutube}">
                                                                        <span class="mdi mdi-twitter"></span>
                                                                    </a>
                                                                    <a href="https://web.telegram.org/k/">
                                                                        <span class="mdi mdi-telegram"></span>
                                                                    </a>
                                                                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${data.meals[0].strMeal} ${data.meals[0].strYoutube}">
                                                                        <span class="mdi mdi-linkedin"></span>
                                                                    </a>
                                                                    
                                                                    </div>
                                                                </div>
                                                            `
                                                        const recipeDetailModal = document.querySelector('.recipe__see__more__modal')
                                                        const recipeDetailContent = document.querySelector('.recipe__see__more__modal__content')
                                                        recipeDetailContent.style.display = "block"
                                                        recipeDetailContent.innerHTML = html
                                                        recipeDetailModal.style.display = "block"
                                                        recipeDetailModal.style.visibility = "visible"

                                                        /*=================================> CLOSE MODAL SEE MORE SEARCH RESULT<================================*/
                                                        const closeDetailModal = document.querySelector('.recipe__see__more__modal__content .close__modal')
                                                        closeDetailModal.addEventListener('click', (e) => {
                                                            e.preventDefault()
                                                            recipeDetailContent.style.display = "none"
                                                            recipeDetailContent.innerHTML = ''
                                                            recipeDetailModal.style.display = "none"
                                                            recipeDetailModal.style.visibility = "hidden"
                                                        })
                                                    })
                                            })
                                        })
                                    }
                                } else if (!ingDataJson.meals){
                                    searchNone.classList.add('active')
                                    searchNone.innerHTML = 'AUCUN METS DISPONIBLE'
                                }

                            } btnSearch.addEventListener('click', receiveIngData)


                        }


                        if (menuActive == 'menu3') {
                           document.querySelector('.error__part').classList.remove('active')
                            document.querySelector('.error__part p').classList.remove('active')
                            document.querySelector('.error__part p').innerHTML = ''
                            const sheetRegistration = document.querySelector('form')
                            if (sheetRegistration) {
                                let tabEnreg = []
                                const btnAddRecipe = document.querySelector('.add__recipe__btn button')
                                btnAddRecipe.addEventListener('click', (e) => {
                                    e.preventDefault()


                                    const nameRecipe = document.getElementById('name__recipe').value
                                    const categoryRecipe = document.getElementById('category-recipe').value
                                    const nbrRecipe = document.getElementById('nbrP-recipe').value
                                    const timeRecipe = document.getElementById('time-recipe').value
                                    const ingredientRecipe = document.getElementById('ingredient').value
                                    const cookingStage = document.getElementById('cooking-stage').value
                                    const errorAddRecipe = document.querySelector('.error__part')
                                    const errorAddRecipeText = document.querySelector('.error__part p')

                                    errorAddRecipe.classList.remove('active')
                                    errorAddRecipeText.classList.remove('active')
                                    errorAddRecipeText.innerHTML = ''

                                    if (nameRecipe == "" || categoryRecipe == "" || nbrRecipe == "" || timeRecipe == "" || ingredientRecipe == "" || cookingStage == "") {
                                        errorAddRecipe.classList.add('active')
                                        errorAddRecipeText.classList.add('active')
                                        errorAddRecipeText.innerHTML = 'Veuillez remplir tous les champs'
                                    } else {
                                        document.getElementById('name__recipe').value = ""
                                        document.getElementById('category-recipe').value = ""
                                        document.getElementById('nbrP-recipe').value = ""
                                        document.getElementById('time-recipe').value = ""
                                        document.getElementById('ingredient').value = ""
                                        document.getElementById('cooking-stage').value = ""
                                        errorAddRecipe.classList.add('active')
                                        errorAddRecipeText.classList.add('active')
                                        errorAddRecipeText.innerHTML = 'Ajout effectué'
                                        /* alert('Ajout affecctué') */

                                        tabEnreg = JSON.parse(localStorage.getItem('enreg')) ?? []
                                        if (tabEnreg.length == 0) {
                                            const dataRecipeAdd = {
                                                'nomRecipe': nameRecipe,
                                                'nomCategory': categoryRecipe,
                                                'nbrPerson': nbrRecipe,
                                                'timeCooking': timeRecipe,
                                                'ingredient': ingredientRecipe,
                                                'cookinStage': cookingStage
                                            }
                                            tabEnreg.push(dataRecipeAdd)
                                            localStorage.setItem('enreg', JSON.stringify(tabEnreg))
                                        }
                                        else {
                                            const dataRecipeAdd = {
                                                'nomRecipe': nameRecipe,
                                                'nomCategory': categoryRecipe,
                                                'nbrPerson': nbrRecipe,
                                                'timeCooking': timeRecipe,
                                                'ingredient': ingredientRecipe,
                                                'cookinStage': cookingStage
                                            }
                                            tabEnreg.push(dataRecipeAdd)
                                            localStorage.setItem('enreg', JSON.stringify(tabEnreg))
                                        }
                                    }
                                
                                })
                            }
                        }
                        if (menuActive == 'menu4') {
                            let addRecipeData = JSON.parse(localStorage.getItem('enreg'))
                            const mesEnregistrements = document.querySelector('tbody')
                            mesEnregistrements.innerHTML = ''
                            let tabEnregistrement = ''
                            //let id = 0
                            if (addRecipeData) {
                                addRecipeData.forEach((itemAddRecipe, index) => {
                                    console.log(itemAddRecipe.nomRecipe);
                                    //id += 1;
                                    tabEnregistrement =
                                        `
                                                <tr id=${index + 1}>
                                                    <td >${index + 1}</td>
                                                    <td>${itemAddRecipe.nomRecipe}</td>
                                                    <td>${itemAddRecipe.nomCategory}</td>
                                                    <td>${itemAddRecipe.timeCooking}</td>
                                                    <td class="actions">
                                                    <span class="mdi mdi-pencil"></span>
                                                    <span class="mdi mdi-eye"></span>
                                                    <span class="mdi mdi-delete"></span>
                                                    </td>
                                                </tr>
                                            `
                                    mesEnregistrements.innerHTML += tabEnregistrement
                                })

                                const seeEnregMore = document.querySelectorAll('.mdi-eye')

                                seeEnregMore.forEach(itemSeeMoreEnreg => {
                                    itemSeeMoreEnreg.addEventListener('click', (e) => {
                                        console.log(itemSeeMoreEnreg)
                                        e.preventDefault()
                                        console.log('cool');
                                        let parentBtn = itemSeeMoreEnreg.closest('tr')
                                        const seeMoreEnregModal = document.querySelector('.recipes__list__item__seemore__modal')
                                        let enregDetailled = ''
                                        addRecipeData.forEach((item, index) => {
                                            if (index + 1 == parentBtn.id) {
                                                //console.log(item);
                                                enregDetailled =
                                                    `
                                                            <div class="close__modal">
                                                                <span></span>
                                                            </div>
                                                            <div class="recipes__list__item__seemore">
                                                                <div class="name__recipe">
                                                                    <h4> NOM DE LA RECETTE</h4>
                                                                    <p>${item.nomRecipe}</p>
                                                                </div>
                                                                <div class="category__recipe">
                                                                    <h4> CATEGORY DE LA RECETTE</h4>
                                                                    <p>${item.nomCategory}</p>
                                                                </div>
                                                                <div class="nbr__recipe">
                                                                    <h4>NOMBRE DE PERSONNE</h4>
                                                                    <p>${item.nbrPerson}</p>
                                                                </div>
                                                                <div class="time__recipe">
                                                                    <h4>TEMPS DE PREPARATION</h4>
                                                                    <p>${item.timeCooking}</p>
                                                                </div>
                                                                <div class="recipe__detailled">
                                                                    <div class="ingredient__recipe__detailled">
                                                                        <h4>INGREDIENTS</h4>
                                                                        <p>${item.ingredient}</p>
                                                                    </div>
                                                                    <div class="ingredient__recipe__detailled">
                                                                        <h4>ETAPES DE LA PREPARATION</h4>
                                                                        <p>${item.cookinStage}</p>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                        `
                                                seeMoreEnregModal.classList.add('active')
                                                seeMoreEnregModal.innerHTML = enregDetailled
                                            }
                                        })

                                        /*===========================> CLOSE MODALE <=======================*/
                                        let closeSeeMoreEnregModal = document.querySelector('.recipes__list__item__seemore__modal .close__modal')
                                        closeSeeMoreEnregModal.addEventListener('click', (e) => {
                                            e.preventDefault()
                                            seeMoreEnregModal.classList.remove('active')
                                        })
                                    })

                                })
                            }

                            const deleteBtn = document.querySelectorAll('.actions span.mdi-delete')
                            deleteBtn.forEach(deleteBtnItem => {
                                deleteBtnItem.addEventListener('click', (e) => {
                                    e.preventDefault()
                                    let parentBtn = deleteBtnItem.closest('tr')
                                    let parentBtnId = Number(parentBtn.id - 1)
                                    //console.log(parentBtn);
                                    const seeMoreEnregModal = document.querySelector('.recipes__list__item__seemore__modal')
                                    let addRecipeData = JSON.parse(localStorage.getItem('enreg'))

                                    addRecipeData.forEach((item, index) => {
                                        //console.log(item);
                                        if (index + 1 == parentBtn.id) {
                                            //console.log(parentBtn.id);
                                            //delete addRecipeData[parentBtnId]                   /*  console.log(addRecipeData[parentBtn.id - 1]); */
                                            //console.log(parentBtnId - 1);
                                            //console.log(index);

                                        }
                                        localStorage.setItem('enreg', JSON.stringify(addRecipeData))
                                        JSON.parse(localStorage.getItem('enreg'))
                                        console.log();
                                    })
                                })

                            })
                        }
                        if (menuActive == 'menu5') {
                            /*==================================> SAVE RECIPE <===============================*/
                            let userDataSave = JSON.parse(localStorage.getItem('userSave'))
                            console.log(userDataSave);
                            const saveList = document.querySelector('.save__list')
                            saveList.innerHTML = ''
                            let parentSaveData = ''

                            userDataSave.forEach(item => {
                                console.log(item);
                                let recipe = item.recipeSave
                                console.log(recipe);
                                parentSaveData =
                                    `
                                            <div class="save__list__item" id='${recipe.idMeal}'>
                                                <div class="meal__recipe">
                                                    <div class="meal__img">
                                                        <img src="${recipe.strMealThumb}" alt="">
                                                    </div>
                                                    <div class="meal__name">
                                                        <h4>${recipe.strMeal}</h4>
                                                    </div>
                                                    <div class="meal__see__more">
                                                        <button class="recipe__see__more">Voir plus</button>
                                                    </div>
                                                    <div class="actions">
                                                        <p class="date">${item.date}</p>
                                                        <span class="mdi mdi-delete"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        `
                                saveList.innerHTML += parentSaveData
                            })



                        }
                        /*==================================> SHOW MORE SAVE RECIPE <===============================*/
                        const saveRecipe = document.querySelectorAll('.save__list__item')
                        if (saveRecipe) {
                            const saveRecipeBtn = document.querySelectorAll('.save__list .save__list__item .meal__see__more button')
                            //console.log(saveRecipeBtn);
                            saveRecipeBtn.forEach(saveRecipeBtnItem => {
                                //console.log(saveRecipeBtnItem);
                                saveRecipeBtnItem.addEventListener('click', (e) => {
                                    let parentSaveRecipeBtnItem = saveRecipeBtnItem.closest('.save__list .save__list__item')
                                    let parentSaveRecipeBtnItemId = parentSaveRecipeBtnItem.id
                                    //console.log(parentSaveRecipeBtnItemId);
                                    let saveRecipeModal = document.querySelector('.save__recipe__item__modal')
                                    let showMore = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${parentSaveRecipeBtnItemId}`)
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.meals[0]) {
                                                //console.log(data.meals[0]);
                                                const saveRecipeItem =
                                                    `
                                                        <div class="close__modal">
                                                        <span></span>
                                                        </div>
                                                        <div class="recipe__detailed__top">
                                                            <div class="recipe__detailed__img">
                                                                <img src="${data.meals[0].strMealThumb}" alt="">
                                                            </div>
                                                            <div class="name__recipe__detailed">
                                                                <h4>${data.meals[0].strMeal}</h4>
                                                            </div>
                                                            <div class="recipe__detailed__bottom">
                                                                <p>${data.meals[0].strInstructions}
                                                                    <a href="${data.meals[0].strYoutube}" target="_blank">Regarder la video</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    `
                                                saveRecipeModal.innerHTML = saveRecipeItem
                                                saveRecipeModal.classList.add('active')

                                                /*=====================> CLOSE MODALE <============================*/
                                                if (saveRecipeModal) {
                                                    const closeSaveDetailModal = document.querySelector('.save__recipe__item__modal.active .close__modal')
                                                    console.log(closeSaveDetailModal)
                                                    closeSaveDetailModal.addEventListener('click', (e) => {
                                                        e.preventDefault()
                                                        console.log(closeSaveDetailModal)
                                                        saveRecipeModal.classList.remove('active')
                                                    })
                                                }
                                            }
                                        })
                                })
                            })
                        }
                        if (menuActive == 'menu6') {
                            console.log('ok');
                        }
                    }
                })
            }
        })
    }

}



/*===========================> DELETE ENREG <=======================*/


/*======================================> ADD RECIPE IN LOCALSTORAGE <===================================*/

/*======================================> RECOVER ADD RECIPE IN TABUSER <===================================*/
/* const mesRecatte = document.querySelector('.user__menu__list__item a span..mdi-room-service-outline')
    mesRecatte.addEventListener('click', (e)=>{
    let addRecipeData = JSON.parse(localStorage.getItem('enreg'))
    if(!addRecipeData){
        addRecipe ()
    }
})   */



