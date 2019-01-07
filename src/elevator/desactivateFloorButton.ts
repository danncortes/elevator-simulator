export function desactivateFloorButton(currentFloor: number, dir: number): void {
  const button = document.querySelectorAll(`[data-floor="${currentFloor}"][data-dir="${dir}"]`)[0];
  button.classList.remove('active');
}
