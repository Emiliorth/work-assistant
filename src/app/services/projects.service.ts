import {Injectable, signal, WritableSignal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';
import {LocalStorageKey} from 'src/app/enums/local-storage-key.enum';
import {ProjectTemplate} from 'src/app/interfaces/project.interface';
import {ProjectFormData} from 'src/app/models/forms/project-form.model';
import {Project} from 'src/app/models/project.model';
import {generateId} from 'src/app/utils/misc.util';

@Injectable({providedIn: 'root'})
export class ProjectsService {
    public projectsSignal: WritableSignal<Project[]> = signal([]);
    public projects$: Observable<Project[]> = toObservable(this.projectsSignal);
    public selectedProject: Project | null = null;

    constructor() {
        this.initiate();
    }

    public initiate() {
        const dataString = localStorage.getItem(LocalStorageKey.PROJECTS);
        if (!dataString) return;

        const data = JSON.parse(dataString) as ProjectTemplate[];
        this.projectsSignal.set(data.map(entry => new Project(entry)));
    }

    public createProject(data: ProjectFormData, callback: () => void) {
        if (this.projectsSignal().some(entry => entry.name === data.name)) return;

        this.projectsSignal.update(value => [...value, new Project({id: generateId(), ...data})]);
        this.saveProjectsToLocalStorage();
        callback();
    }

    public updateProject(data: ProjectFormData, callback: () => void) {
        if (!this.selectedProject) return;

        const {id} = this.selectedProject;
        if (this.projectsSignal().some(entry => entry.name === data.name && entry.id !== id)) return;

        const result: ProjectTemplate = {id, ...data};
        this.projectsSignal.update(value => {
            const found = value.find(entry => entry.id === id);
            if (!found) return value;

            const index = value.indexOf(found);
            value[index].updateData(result);
            return [...value];
        });

        this.saveProjectsToLocalStorage();
        callback();
    }

    public deleteProject(id: string) {
        this.projectsSignal.update(value => [...value.filter(entry => entry.id !== id)]);
        this.saveProjectsToLocalStorage();
    }

    private saveProjectsToLocalStorage() {
        const data = JSON.stringify(this.projectsSignal());
        localStorage.setItem(LocalStorageKey.PROJECTS, data);
    }
}