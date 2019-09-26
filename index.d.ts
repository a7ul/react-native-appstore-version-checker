declare module 'react-native-appstore-version-checker' {
    export type AppVersion = string;
    export interface VersionChecker {
        getAppstoreAppVersion(id:string, options?:any):Promise<AppVersion>
    }

    const versionChecker:VersionChecker;
    export default versionChecker;
}
