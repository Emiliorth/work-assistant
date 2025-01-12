import {ProjectTemplate} from 'src/app/interfaces/project.interface';
import {ProjectFormData} from 'src/app/models/forms/project-form.model';
import {generateId, openInNewTab} from 'src/app/utils/misc.util';

export class Project implements ProjectTemplate {
    public id: string;
    public name: string;
    public createPr: string;
    public pr: string;
    public commits: string;
    public repository: string;
    public repositories: string;
    public yourWork: string;
    public freeTasks: string;

    constructor(data: {
            id?: string,
            name: string,
            createPr: string,
            pr: string,
            commits: string,
            repository: string,
            repositories: string,
            yourWork: string,
            freeTasks: string
        }
    ) {
        const {
            id,
            name,
            createPr,
            pr,
            commits,
            repository,
            repositories,
            yourWork,
            freeTasks
        } = data;

        this.id = id ?? generateId();
        this.name = name;
        this.createPr = createPr;
        this.pr = pr;
        this.commits = commits;
        this.repository = repository;
        this.repositories = repositories;
        this.yourWork = yourWork;
        this.freeTasks = freeTasks;
    }

    public updateData(data: ProjectTemplate | ProjectFormData & {id: string}) {
        const {id, name, createPr, pr, commits, repository, repositories, yourWork, freeTasks} = data;
        this.id = id ?? this.id;
        this.name = name;
        this.createPr = createPr;
        this.pr = pr;
        this.commits = commits;
        this.repository = repository;
        this.repositories = repositories;
        this.yourWork = yourWork;
        this.freeTasks = freeTasks;
    }

    public openCreatePr() {
        if (!this.createPr) return;

        openInNewTab(this.createPr);
    }

    public openPr() {
        if (!this.pr) return;

        openInNewTab(this.pr);
    }

    public openCommits() {
        if (!this.commits) return;

        openInNewTab(this.commits);
    }

    public openRepository() {
        if (!this.repository) return;

        openInNewTab(this.repository);
    }

    public openRepositories() {
        if (!this.repositories) return;

        openInNewTab(this.repositories);
    }

    public openYourWork() {
        if (!this.yourWork) return;

        openInNewTab(this.yourWork);
    }

    public openFreeTasks() {
        if (!this.freeTasks) return;

        openInNewTab(this.freeTasks);
    }
}