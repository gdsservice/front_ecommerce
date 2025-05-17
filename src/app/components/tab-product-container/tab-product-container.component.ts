import { Component, Input } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';


@Component({
  selector: 'app-tab-product-container',
  templateUrl: './tab-product-container.component.html',
  styleUrl: './tab-product-container.component.css'
})
export class TabProductContainerComponent {

  @Input() produitDAO?: ProduitDAOModel[];

}
