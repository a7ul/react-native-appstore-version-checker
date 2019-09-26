declare module 'react-native-appstore-version-checker' {
    export type AppVersion = string;
    export type Options = {
        typeOfId?:string,
        country?:string,
        jquerySelector?:string
    }
    export interface VersionChecker {
        getAppstoreAppVersion(id:string, options?:Options):Promise<AppVersion>
    }

    const versionChecker:VersionChecker;
    export default versionChecker;
}
