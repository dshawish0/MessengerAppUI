import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithMessageComponent } from './chat-with-message.component';

describe('ChatWithMessageComponent', () => {
  let component: ChatWithMessageComponent;
  let fixture: ComponentFixture<ChatWithMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWithMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
