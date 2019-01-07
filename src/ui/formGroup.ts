export default function formGroup(
  label: string,
  id: string,
  value: number,
  min: number,
  max: number,
  placeHolder: string,
  errorMessage: string
): string {
  return `<div class="form-group">
    <label>${label}</label>
    <div>
      <input
      id="${id}"
      type="number"
      class="form-control"
      value="${value}"
      min="${min}"
      max="${max}"
      placeholder="${placeHolder}"
      required
      data-value-missing=”${errorMessage}”>
    </div>
  </div>`;
}
