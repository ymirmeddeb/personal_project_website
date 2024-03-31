document.querySelectorAll('.element').forEach(element => {
  element.addEventListener('click', () => {
    const symbol = element.dataset.symbol;
    const name = element.dataset.name;
    const atomicNumber = element.dataset.atomicNumber;
    const funFact = element.dataset.funFact;

    // Update the content of the info box
    const infoBox = document.getElementById('elementInfo');
    infoBox.innerHTML = `<strong>${name} (${symbol})</strong><br>
                     Atomic Number: ${atomicNumber}<br>
                     <div class='fun-fact'><em>Fun Fact:</em> ${funFact}</div>`;

  });
});
