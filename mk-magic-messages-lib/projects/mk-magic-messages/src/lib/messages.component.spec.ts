import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Message } from "./core/models/message.model";
import { MessagesComponent } from "./messages.component";
import { MessagesService } from "./messages.service";

describe("MessagesComponent", () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let mockMessagesService: MessagesService;

  beforeEach(async () => {

    mockMessagesService = jasmine.createSpyObj('', ['showInfo'],  { messages$: of([new Message('', '', 1000)]), dismissAll$: of(true) });

    await TestBed.configureTestingModule({
		declarations: [MessagesComponent],
		providers: [{ provide: MessagesService, useValue: mockMessagesService }],
		imports: []
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

})
