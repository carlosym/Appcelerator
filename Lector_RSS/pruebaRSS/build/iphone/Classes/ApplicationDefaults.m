/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"rryoSydDsDf5qIuW1cOlLGhXLLeWOeoc"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"315Skh9BwVddPLLqyzsmrTPh00QLF8GD"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"vxRHTY55RQ1l4bjCDOtmh6llC6Bv3xaU"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"dhWVod26HILD2uOJTzYVbbfe55AikWX9"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"AKg0AKpmSxeapf5Uitd8hFir2MUVENZQ"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"nZuUyKs8F133kANYEnYXcqnAEJN2Z96D"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
