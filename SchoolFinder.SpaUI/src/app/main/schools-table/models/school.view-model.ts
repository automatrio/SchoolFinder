export class School {
    id: number;
    schoolId: number;
    administrativeDepartment: string;
    type: string;
    name: string;                                
    nickName: string;                    
    address: string;                                   
    addressNumber: string;
    neighborhood: string;        
    zipCode: string;
    telephoneNumber: string;            
    email: string;        
    website: string;                                       
    blog: string;
    twitter: string;
    facebook: string;
    situation: string;
    
    distance: number;
    latitude: number;
    longitude: number;
    seeMap: boolean = true;
    seeRoute: boolean;
}