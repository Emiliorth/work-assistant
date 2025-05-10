import {ProjectTemplate} from 'src/app/interfaces/project.interface';
import {generateId, openInNewTab} from 'src/app/utils/misc.util';

export class Project implements ProjectTemplate {
    public id: string;
    public name: string;
    public createPRURL: string;
    public prURL: string;
    public commitsURL: string;
    public repositoryURL: string;

    constructor(data: ProjectTemplate & {id?: string}) {
        const {
            id,
            name,
            createPRURL,
            prURL,
            commitsURL,
            repositoryURL
        } = data;

        this.id = id ?? generateId();
        this.name = name;
        this.createPRURL = createPRURL;
        this.prURL = prURL;
        this.commitsURL = commitsURL;
        this.repositoryURL = repositoryURL;
    }

    public updateData(data: ProjectTemplate) {
        const {id, name, createPRURL, prURL, commitsURL, repositoryURL} = data;
        this.id = id ?? this.id;
        this.name = name;
        this.createPRURL = createPRURL;
        this.prURL = prURL;
        this.commitsURL = commitsURL;
        this.repositoryURL = repositoryURL;
    }

    public openCreatePr() {
        if (!this.createPRURL) return;

        openInNewTab(this.createPRURL);
    }

    public openPr() {
        if (!this.prURL) return;

        openInNewTab(this.prURL);
    }

    public openCommits() {
        if (!this.commitsURL) return;

        openInNewTab(this.commitsURL);
    }

    public openRepository() {
        if (!this.repositoryURL) return;

        openInNewTab(this.repositoryURL);
    }
}