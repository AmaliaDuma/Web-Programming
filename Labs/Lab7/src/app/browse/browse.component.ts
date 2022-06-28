import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
  }

}
