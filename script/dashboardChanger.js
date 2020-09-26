function getPageName() {
    let idOfClickedElement = event.target.id;

    if (idOfClickedElement) {
        replaceDyanmicHTML(idOfClickedElement);
    } else {
        let idOfClickedElement = event.target.parentElement.id;
        replaceDyanmicHTML(idOfClickedElement);
    }
}

async function replaceDyanmicHTML(pageSegment) {
    const contentElement = await fetch(pageSegment + '.html');
    const wrapperElement = document.getElementById('contentContainer');
    
    //remove previous page content
    wrapperElement.innerHTML = '';

    //convert HTML to text
    const contentElementText = await contentElement.text();

    //add new page content
    wrapperElement.insertAdjacentHTML("beforeend", contentElementText);

    //ANIMATE AND DISABLE BUTTONS
    let buttonToDisable = document.getElementById(pageSegment);
    let activeButtons = document.querySelectorAll('.nav-bar > .wrapper > *');

    //activate previously inactive button
    activeButtons.forEach(button => {
        if (button.hasAttribute("onclick")) {
            
        } else {
            button.setAttribute("onclick", "getPageName()");
            button.classList.remove("active");
        }
    });

    //disable clicked button
    buttonToDisable.removeAttribute("onclick");

    //animate clicked button
    buttonToDisable.classList.add("active");
}