import { Injectable } from '@angular/core';

@Injectable()
export class GuidValidatorService {
    // checks if a the guid is valid via regex
    public isGuidParamValid(guid: string): boolean {
        var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        var match = regex.exec(guid);

        return match !== null;
    }
}
