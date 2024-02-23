import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class PaginatorPtBr implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = `Primeira página`;
    itemsPerPageLabel = `Item por página:`;
    lastPageLabel = `Última página`;
    nextPageLabel = 'Próxima página';
    previousPageLabel = 'Página anterior';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `Página 1 de 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Página ${page + 1} de ${amountPages}`;
    }
}

