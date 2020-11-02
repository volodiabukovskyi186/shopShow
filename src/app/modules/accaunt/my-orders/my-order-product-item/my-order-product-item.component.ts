import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyOrdersService } from '../services/my-orders.service';
import { ReviewDialogComponent } from '../../../dialogs/review-dialog/review-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-my-order-product-item',
    templateUrl: './my-order-product-item.component.html',
    styleUrls: ['./my-order-product-item.component.scss']
})
export class MyOrderProductItemComponent implements OnInit {
    @Input() order: any;
    @Input() hoststatic = environment.hoststatic;

    public itemStatus = false;
    public orderId: number;
    public orders: any[] = [];
    orderStatus: any;

    public statusCodes = {
        '1': {
            name: 'statusCodes.done',
            color: '#42996F'
        },
        '2': {
            name: 'statusCodes.inProgress',
            color: '#ffff00'
        },
        '3': {
            name: 'statusCodes.canceled',
            color: '#ff0000'
        },
        '4': {
            name: 'statusCodes.sent',
            color: '#636363'
        }
    };

    public monthNames: any[] = [{
        0: 'months.Jan',
        1: 'months.Feb',
        2: 'months.Mar',
        3: 'months.Apr',
        4: 'months.May',
        5: 'months.Jun',
        6: 'months.Jul',
        7: 'months.Aug',
        8: 'months.Sep',
        9: 'months.Oct',
        10: 'months.Nov',
        11: 'months.Dec'
    }];

    constructor(
        public myOrderService: MyOrdersService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.orderId = this.order.id;
        //this.order = this.order.manufacturers;

        this.order?.manufacturers?.forEach((res) => {
            this.orders.push(res.products);
        });


        //this.getOrderStatus();
        // console.log(this.order);
        // this.getTest()
    }

    public itemDrop(): void {
        this.itemStatus == false ? this.itemStatus = true : this.itemStatus = false;

    }

    public modifyPrice(price) {
        return Number(price).toFixed(0);
    }

    public modifyDateString(date, type: string) {
        let substringDate = date?.substring(0, 10);
        let t = new Date(substringDate);

        if (type === 'day') {
            return t.getDate();
        } else if (type === 'months') {
            return this.monthNames[0][t.getMonth()];
        } else if (type === 'year') {
            return t.getFullYear();
        }
    }

    public openReviewModal() {
        const dialogRef = this.dialog.open(ReviewDialogComponent, {
            data: {
                title: 'Select product to review',
                actions: [
                  {
                    param: 'closeIcon',
                    label: 'Cancel',
                  },
                  {
                    param: 'add',
                    label: 'Add',
                  },
                ],
                order: this.order
              },
            });
        dialogRef.afterClosed().subscribe(res => {});
    }

    // getOrderStatus(): void {
    //
    //     let lang = localStorage.getItem('current_lang');
    //     console.log('statusid====>',lang);
    //     this.myOrderService.getProdStatus(this.order.status[0].description.order_status_id, lang).subscribe(data => {
    //         this.orderStatus = data.data[0].status[0].description.dectiption;
    //         console.log(data.data);
    //     });
    //
    // }
    // getTest():void{
    //     this.myOrderService.getProdStatus(1,'ua').subscribe(data=>{
    //         // console.log('datadata====>',data)
    //     })
    // }
}
