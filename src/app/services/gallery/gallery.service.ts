import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, Subject, takeUntil} from "rxjs";

export type GalleryImageType = {
  id?: any,
  parentId: number,
  images: string[]
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService implements OnDestroy {
  images: GalleryImageType[] = []
  subscription$: Subject<GalleryImageType[]> = new Subject<GalleryImageType[]>();

  constructor(private http: HttpClient) {
    this.fetchImages();
  }

  getImages() {
    return this.images;
  }

  createImage(newItem: GalleryImageType) {
    this.http.post("/images", {...newItem})
      .pipe(takeUntil(this.subscription$))
      .subscribe((response) => response)
  }

  updateImage(newItem: GalleryImageType & { id: number }, callback?: () => void) {
    this.http.put(`/images/${newItem.id}`, newItem)
      .pipe(takeUntil(this.subscription$))
      .subscribe((response) => {
        if (callback) {
          callback()
        }
        return response;
      })
  }

  deleteImageFolder(id: number | undefined, listId: number | undefined) {
    if (id) {
      this.http.delete(`/images/${id}`).pipe(takeUntil(this.subscription$)).subscribe((response) => response)
    } else if (listId) {
      this.fetchImageByParentId(listId).pipe(takeUntil(this.subscription$))
        .subscribe((response: any) => this.deleteImageFolder(response[0].id, undefined))
    }
  }

  fetchImages(): Observable<any> {
    return this.http.get("/images")
      .pipe(
        map((images: any) => {
          this.images = images
          return images;
        }),
        catchError((error) => {
          console.error(error)
          return [];
        }),
        takeUntil(this.subscription$)
      )
  }

  fetchImageByParentId(parentId: number) {
    return this.http.get(`/images`, {
      params: {
        parentId: parentId
      }
    })
  }

  ngOnDestroy() {
    this.subscription$.next([]);
    this.subscription$.unsubscribe();
  }
}
