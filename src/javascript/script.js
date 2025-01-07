// Alterna a exibição da sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Alterna os dropdowns ao clicar
document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function () {
        const dropdownContainer = this.nextElementSibling;
        if (dropdownContainer.classList.contains('active')) {
            dropdownContainer.classList.remove('active');
        } else {
            // Fecha outros dropdowns antes de abrir o clicado
            document.querySelectorAll('.dropdown-container').forEach(container => {
                container.classList.remove('active');
            });
            dropdownContainer.classList.add('active');
        }
    });
});

// Fecha a sidebar ao clicar fora dela (em dispositivos móveis)
document.addEventListener('click', function (event) {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.sidebar-toggle');

    // Verifica se o clique foi fora da sidebar e do botão de toggle
    if (
        !sidebar.contains(event.target) &&
        !toggleButton.contains(event.target) &&
        sidebar.classList.contains('active')
    ) {
        sidebar.classList.remove('active');
    }
});
