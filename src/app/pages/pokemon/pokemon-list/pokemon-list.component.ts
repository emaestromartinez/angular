import { Pokemon, PokemonList } from './../pokemon-page.interface';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { STAR_WARS_ROUTES_URL } from '../../star-wars/star-wars-page.constants';
import { PokemonPageService } from '../pokemon-page.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {
  unsubscribe$: Subject<void> = new Subject<void>();

  @Input() pokemonList: PokemonList;

  columnsToDisplay = ['name', 'weight', 'types', 'image'];

  pokemonRoutesURL = STAR_WARS_ROUTES_URL;

  // Pagination
  pageEvent: PageEvent;

  length: number;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;
  // PaginationEnd

  @ViewChild(MatTable) table: MatTable<Pokemon>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Pokemon>;

  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _pokemonPageService: PokemonPageService
  ) {}

  ngOnInit() {
    this.length = this.pokemonList?.count;
    this.dataSource = new MatTableDataSource<Pokemon>(
      this.pokemonList?.pokemon.slice()
    );
  }

  ngOnChanges() {
    this.replacePokemonList();
  }

  replacePokemonList(data?: Pokemon[]) {
    if (data) {
      if (this.dataSource) {
        this.dataSource.data = data;
      } else {
        this.dataSource = new MatTableDataSource<Pokemon>(
          this.pokemonList?.pokemon.slice()
        );
      }
    }

    this.table?.renderRows();
  }

  showPokemonDetails(pokemon: Pokemon) {
    if (!this.isLoading) {
      this._router.navigate([pokemon.pokemonId], { relativeTo: this._route });
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    let isItNext = true;
    if (event.previousPageIndex) {
      isItNext = event.pageIndex - event.previousPageIndex === 1 ? true : false;
    }
    if (event.previousPageIndex || event.previousPageIndex === 0) {
      this.isLoading = true;
      this._pokemonPageService
        .getPokemon(isItNext)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((newPageValues) => {
          this._pokemonPageService.pagination.next({
            count: newPageValues.count,
            next: newPageValues.next,
            previous: newPageValues.previous,
          });
          this.replacePokemonList(newPageValues.pokemon);
          this.isLoading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
