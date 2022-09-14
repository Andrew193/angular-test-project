import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryImageType, GalleryService} from "../../services/gallery/gallery.service";
import {PopupService} from "../../services/popup/popup.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [PopupService]
})
export class GalleryComponent implements OnInit {
  galleryImages: GalleryImageType[] = [];

  constructor(private galleryService: GalleryService, public popup: PopupService) {
    galleryService.fetchImages().subscribe((galleryImages) => this.galleryImages = galleryImages)
  }

  @ViewChild("fileDownloader") fileDownloader!: ElementRef;

  getImgForPreview(imgSrc: string) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("gallery-preview-image");
    img.style.width = '100%';
    img.style.height = '500px';
    return img;
  }

  public expandImage = (event: { imageSrc: string, deleteImage: () => void }): void => {
    console.log(event)
    const {imageSrc, deleteImage} = event
    this.fileDownloader.nativeElement.href = imageSrc;

    this.popup.showModal("Image preview", {
      customButton: true,
      customButtons: [{
        label: "Cool", onclick: () => {
          this.popup.hideModal(true);
          this.fileDownloader.nativeElement.href = '';
        }
      },
        {label: "Download", onclick: () => this.fileDownloader.nativeElement.click()},
        {
          label: "Delete", onclick: () => {
            deleteImage()
            this.popup.hideModal(true);
            this.fileDownloader.nativeElement.href = '';
          }
        }
      ],
      customContent: this.getImgForPreview(imageSrc)
    })
  }

  ngOnInit(): void {
  }

  yesPopup() {
    this.popup.hideModal(true);
  }

  noPopup() {
    this.popup.hideModal(false);
  }

}
