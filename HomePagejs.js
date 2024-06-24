const userRole = "manager";  // Change this to dynamically fetch the user's role
const sidebar = document.getElementById('sidebar');

fetch('mockobject.json')
    .then(response => response.json())
    .then(data => {
        const roleData = data.roles[userRole];
        const ul = document.createElement('ul');

        roleData.forEach(item => {
            const li = document.createElement('li');
            if (item.sublinks) {
                li.classList.add('dropdown');
                const div = document.createElement('div');
                div.classList.add('dropdown-pointer-style');
                div.textContent = item.text;
                li.appendChild(div);
                
                const subUl = document.createElement('ul');
                subUl.classList.add('dropdown-content');
                item.sublinks.forEach(subItem => {
                    const subLi = document.createElement('li');
                    const subA = document.createElement('a');
                    subA.href = subItem.href;
                    subA.textContent = subItem.text;
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                });
                li.appendChild(subUl);
            } else {
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.text;
                li.appendChild(a);
            }
            ul.appendChild(li);
        });

        sidebar.appendChild(ul);
    });

const toggleButton = document.getElementById('toggle-button');
const mainContent = document.getElementById('main-content');

toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent the click event from propagating to the mainContent
    sidebar.classList.add('active');
    mainContent.classList.add('shifted');
});

mainContent.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
    }
});