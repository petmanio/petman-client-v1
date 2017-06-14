import { Component, OnDestroy, OnInit } from '@angular/core';

export interface IQuestionsComponent {
}

@Component({
  selector: 'app-questions',
  template: `
    <h1>Questions</h1>
  `,
  styles: [`
  `]
})
export class QuestionsComponent implements OnInit, OnDestroy, IQuestionsComponent {
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
