const tabs = document.querySelectorAll(".analysis-tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {

        // Remove the active state from every tab
        tabs.forEach((item) => {
            item.classList.remove("active");
        });

        // Add the active state to the tab that was clicked
        tab.classList.add("active");

        // Hide all tab content
        tabContents.forEach((content) => {
            content.style.display = "none";
        });

        // Show the matching tab content
        const tabName = tab.dataset.tab;
        const activeContent = document.getElementById(tabName);

        activeContent.style.display = "block";
    });
});