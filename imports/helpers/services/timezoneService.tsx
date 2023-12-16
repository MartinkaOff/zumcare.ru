export async function getTimezones(selectedTimezone: string | undefined) {
  if (selectedTimezone) {
    const timezoneResponse = await fetch(
      `https://worldtimeapi.org/api/timezone/${selectedTimezone}`
    );
    const timezones = await timezoneResponse.json();
    return timezones;
  }
}

export async function getLocation(selectedLocation: string | undefined) {
  if (selectedLocation) {
    const locationResponse = await fetch(
      `https://worldtimeapi.org/api/timezone/${selectedLocation}`
    );
    const location = await locationResponse.json();
    return location;
  }
}

export async function getLocationByIp() {
  const locationByIpResponse = await fetch(`https://worldtimeapi.org/api/ip`);
  const locationByIp = await locationByIpResponse.json();
  return locationByIp;
}
