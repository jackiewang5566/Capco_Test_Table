import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Data } from '../data-structure/data';
import { SubmitParams } from '../data-structure/submit-params';

describe('DataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let dataService: DataService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService]    
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should make get request', inject([HttpTestingController, DataService], (httpMock: HttpTestingController,
    dataService: DataService) => {
      const mockData: Data[] = [
        {
          "name": "Nell D. Michael",
          "phone": "602-1033",
          "email": "hendrerit.id.ante@placeratvelit.ca",
          "company": "Praesent Eu LLP",
          "date_entry": "2017-07-30 23:27:39",
          "org_num": "907369 2973",
          "address_1": "P.O. Box 916, 8584 Vestibulum St.",
          "city": "Vitry-sur-Seine",
          "zip": "2353",
          "geo": "60.77971, 7.98874",
          "pan": "4532992507580",
          "pin": "7086",
          "id": 1,
          "status": "read",
          "fee": "$60.99",
          "guid": "48653E36-987F-48EC-7382-7F009FF34628",
          "date_exit": "2018-11-14 12:37:54",
          "date_first": "2018-05-20 01:07:05",
          "date_recent": "2019-04-06 23:28:25",
          "url": "https://capco.com/"
        },
        {
          "name": "Ciara G. Stanley",
          "phone": "1-358-613-2160",
          "email": "natoque.penatibus@facilisisloremtristique.co.uk",
          "company": "Nunc Nulla Vulputate LLP",
          "date_entry": "2018-03-25 11:05:22",
          "org_num": "987983 1023",
          "address_1": "Ap #700-733 Senectus Rd.",
          "city": "Maule",
          "zip": "21911",
          "geo": "-47.21116, 22.18684",
          "pan": "4024007170167232",
          "pin": "6394",
          "id": 2,
          "status": "expired",
          "fee": "$92.73",
          "guid": "D4CC10B0-5F19-EE33-CCA2-95DBD8E7B21F",
          "date_exit": "2018-07-22 19:05:57",
          "date_first": "2018-08-02 03:50:35",
          "date_recent": "2017-08-12 01:56:58",
          "url": "https://capco.com/"
        }
      ];
      
      dataService.getData();
      const req = httpMock.expectOne('/api/sample_data');
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
  }));
  
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});
