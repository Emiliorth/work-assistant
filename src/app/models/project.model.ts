import {ProjectTemplate} from 'src/app/interfaces/project.interface';
import {generateId, openInNewTab} from 'src/app/utils/misc.util';

export class Project {
    public data: ProjectTemplate;

    constructor(data: ProjectTemplate) {
        this.data = {
            ...data,
            id: data.id ?? generateId()
        };
    }

    public updateData(data: ProjectTemplate) {
        this.data = {...data, id: data.id ?? this.data.id};
    }

    public openCreatePr() {
        if (!this.data.createPRURL) return;

        openInNewTab(this.data.createPRURL);
    }

    public openPr() {
        if (!this.data.prURL) return;

        openInNewTab(this.data.prURL);
    }

    public openCommits() {
        if (!this.data.commitsURL) return;

        openInNewTab(this.data.commitsURL);
    }

    public openRepository() {
        if (!this.data.repositoryURL) return;

        openInNewTab(this.data.repositoryURL);
    }

    public openFrontEnd() {
        if (!this.data.feURL) return;

        openInNewTab(this.data.feURL);
    }

    public openSwagger() {
        if (!this.data.swaggerURL) return;

        openInNewTab(this.data.swaggerURL);
    }
}