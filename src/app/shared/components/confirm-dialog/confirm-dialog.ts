import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  readonly title = input('¿Estás seguro?');
  readonly message = input.required<string>();
  readonly confirm = output<void>();
  readonly cancel = output<void>();

  protected onConfirm(): void {
    this.confirm.emit();
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
