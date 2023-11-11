import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffreService } from 'src/app/demo/Services/OffreService';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-offre-de-stage',
  templateUrl: './offre-de-stage.component.html',
  styleUrls: ['./offre-de-stage.component.scss']
})
export class OffreDeStageComponent implements OnInit{
  stagieres:Array<any>=[];
  @Input()
  offre:any ;



  constructor(
    private router: Router,
    private offreService: OffreService,
    private StagiereService: StagiereService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
  
  }
  ngOnInit(): void {
    if (this.offre) {
      console.log("aaaaaaaaaaaaaaaaaaaa" + this.offre.id);
      this.StagiereService.getStagiereByOffre(this.offre.id).subscribe((res) => {
        res.forEach(element => {
          this.stagieres.push(element);
        });
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

onUpdateClick(offre: any) {
  this.router.navigate(['admin/updateoffre', offre.id]);
}
onDeleteClick(offre: any) {
  this.offreService.deleteOffre(offre.id).subscribe(
    () => {
      location.reload();
    },
    (error) => {
      console.error('Error deleting offer:', error);
      // Handle error, display a notification, or perform other actions
    }
  );
}
}
