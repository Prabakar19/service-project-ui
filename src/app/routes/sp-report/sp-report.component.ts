import { Component, OnInit } from '@angular/core';
import { DownloadServiceService } from 'src/app/services/download-service.service';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';
import {Chart} from 'node_modules/chart.js'

@Component({
  selector: 'app-sp-report',
  templateUrl: './sp-report.component.html',
  styleUrls: ['./sp-report.component.css']
})
export class SpReportComponent implements OnInit {

  spId=1;
  constructor(private serviceProviderService : ServiceProviderService,
    private downloadService :DownloadServiceService) { }

  billings : any;
  store : any;
  sp:any;
  ngOnInit(): void {
//     var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
this.getTransactionCounts();
console.log("hey"+this.sp)

    this.getReport()
  
  }
billingHeaader =  ['billingId','cost','customerId','gst','originalCost','serviceProviderId','totalCost']
serviceHeader = ['categoryId','cost','details','discount','discountAvailability','rating','serviceId','serviceName','serviceProviderId','serviceRatings','warranty']
customerHeader = ['emailId','firstName','lastName','phoneNum'];
download(){
    this.downloadService.downloadFile(this.store.billings, 'billings',this.billingHeaader);
  }
  downloadServices(){
    this.downloadService.downloadFile(this.store.services, 'services',this.serviceHeader);
  }
  downloadCustomers(){
    this.downloadService.downloadFile(this.store.customers, 'customers',this.customerHeader);
  }

  getReport() {
    console.log("hey")
    this.serviceProviderService.getServiceProviderReport(this.spId).subscribe(
      (res) => {
        console.log(res);
        this.store= res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showChart(){
    console.log()
    var data = {
      labels: this.sp.serviceNames,
      datasets: [{
        label: "Service Transcation Count ",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: this.sp.transactionCounts,
      }]
    };
    
    var options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    };
    
    Chart.Bar('chart', {
      options: options,
      data: data
    })
  }

  getTransactionCounts()
  {
    this.serviceProviderService.getServiceTransactionCount(this.spId).subscribe(
      (res) => {
        console.log(res);
        this.sp= res;
        this.showChart();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getServiceProviderBills() {
    console.log("hey")
    this.serviceProviderService.getServiceProviderRequest(this.spId).subscribe(
      (res) => {
        console.log(res);
        this.billings = res.billings;
        console.log(this.billings);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
