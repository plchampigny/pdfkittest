import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFCheckBox, PDFDocument, PDFDropdown, PDFRadioGroup, PDFTextField } from 'pdf-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PdfViewerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdfkittest';

  public fields: { name: string, value: string | undefined }[] = [];

  public originalPdf: string | undefined;
  public filledPdf: string | undefined;

  public async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const buffer = await file.arrayBuffer();

    const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {});

    const originalBlob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    this.originalPdf = URL.createObjectURL(originalBlob);

    const form = pdfDoc.getForm();
    for (const field of form.getFields()) {
      if (field instanceof PDFTextField) {
        this.fields.push({ name: field.getName(), value: field.getText() });

        if (field.getName().startsWith('__Image')) {
          const data = await fetch('data:image/jpeg;base64,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')

          const buffer = await data.arrayBuffer();
          field.setImage(await pdfDoc.embedJpg(buffer));
          field.enableReadOnly();
        } else {
          field.setText('Hello World!');
        }
      } else if (field instanceof PDFCheckBox) {
        this.fields.push({ name: field.getName(), value: field.isChecked() ? 'checked' : 'unchecked' });
        field.check();
      } else if (field instanceof PDFRadioGroup) {
        const options = field.getOptions();
        this.fields.push({ name: field.getName(), value: options.map(o => o).join(', ') });
        field.select(options[1]);
      } else if (field instanceof PDFDropdown) {
        const options = field.getOptions();
        this.fields.push({ name: field.getName(), value: options.map(o => o).join(', ') });
        field.select(options[1]);
      }

      else {
        this.fields.push({ name: field.getName(), value: typeof field });

      }
    }

    const blob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    this.filledPdf = URL.createObjectURL(blob);

  }
}
