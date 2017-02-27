import { Injectable } from '@angular/core';

@Injectable()
export class GuidValidatorService {
    // checks if a the guid is valid via regex
    public isGuidParamValid(guid: string): boolean {
        var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        var match = regex.exec(guid);

        return match !== null;
    }
}
