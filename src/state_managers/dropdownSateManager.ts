export let dropdownStates: { [key: string]: boolean } = {};

export function setDropdownState(id: string, state: boolean) {
  dropdownStates[id] = state;
  localStorage.setItem('dropdownStates', JSON.stringify(dropdownStates));
}

export function getDropdownState(id: string): boolean {
  const storedStates = localStorage.getItem('dropdownStates');

  if (storedStates) {
    dropdownStates = JSON.parse(storedStates);
  }
  return dropdownStates[id] || false;
}

export function initDropdownStates() {
  const storedStates = localStorage.getItem('dropdownStates');

  if (storedStates) {
    dropdownStates = JSON.parse(storedStates);
  }
}