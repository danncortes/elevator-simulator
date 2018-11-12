export default function formGroup(label, id, value, min, max, placeHolder, errorMessage) {
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
