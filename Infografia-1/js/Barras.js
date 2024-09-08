
function updateBar(checkId, barId, percentage) {
    const checkBox = document.getElementById(checkId);
    const bar = document.getElementById(barId);
    const percentageValue = document.getElementById(barId.replace('Bar', 'Percentage'));

    if (checkBox.checked) {
        bar.style.width = percentage + '%';
        percentageValue.textContent = percentage + '%';
    } else {
        bar.style.width = '0';
        percentageValue.textContent = '';
    }
}
