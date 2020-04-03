import { Component, OnInit } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor() {}

  ngOnInit(): void {}
}
