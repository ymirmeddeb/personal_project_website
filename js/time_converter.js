function filterTimezones() {
  const searchValue = document.getElementById('searchTimezone').value.toLowerCase();
  const timezoneSelect = document.getElementById('timezoneSelect');
  const options = timezoneSelect.options;

  for (let i = 0; i < options.length; i++) {
    const optionText = options[i].text.toLowerCase();
    const matchesSearch = optionText.includes(searchValue);
    options[i].style.display = matchesSearch ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const timezoneFromSelect = document.getElementById('timezoneFrom');
  const timezoneToSelect = document.getElementById('timezoneTo');
  const timezones = moment.tz.names();

  // Populate the dropdowns with timezones
  timezones.forEach(tz => {
    const optionFrom = new Option(tz, tz);
    const optionTo = new Option(tz, tz);
    timezoneFromSelect.add(optionFrom);
    timezoneToSelect.add(optionTo);
  });

  document.getElementById('convertTimeBtn').addEventListener('click', () => {
    const timezoneFrom = timezoneFromSelect.value;
    const timezoneTo = timezoneToSelect.value;
    const timeInFromZone = moment.tz(timezoneFrom).format('YYYY-MM-DD HH:mm:ss');
    const timeInToZone = moment.tz(timezoneTo).format('YYYY-MM-DD HH:mm:ss');

    // Display the result
    const timeResultDiv = document.getElementById('timeResult');
    timeResultDiv.innerHTML = `
      Time in ${timezoneFrom}: ${timeInFromZone}<br>
      Time in ${timezoneTo}: ${timeInToZone}
    `;
  });
});
