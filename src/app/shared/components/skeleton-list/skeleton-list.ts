import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  imports: [],
  templateUrl: './skeleton-list.html',
  styleUrl: './skeleton-list.scss',
})
export class SkeletonList {
  readonly count = input(3);

  protected readonly placeholders = computed(() => Array.from({ length: this.count() }));
}