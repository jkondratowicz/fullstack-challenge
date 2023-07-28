import {
    CreateProjectDto,
    DeleteProjectResult,
    Project,
    RestoreProjectResult,
    UpdateProjectDto,
    UpdateProjectResult
} from "../interfaces/project.interface";
import HTTPService from "./HTTPService";
import LocalStorageService from "./LocalStorageService";

class ProjectsService {
    public async fetchProjects(): Promise<Project[] | undefined> {
        try {
            const projects = await HTTPService.get<Project[]>(`projects`)

            return this.sortProjects(projects)
        }
        catch (e) {
            console.log('Error fetching projects', e)
            return Promise.resolve([])
        }
    }

    public async searchProjects(query: string): Promise<Project[] | undefined> {
        try {
            const projects = await HTTPService.get<Project[]>(`projects/search?query=${encodeURIComponent(query)}`)

            return this.sortProjects(projects)
        }
        catch (e) {
            console.log('Error fetching projects', e)
            return Promise.resolve([])
        }
    }

    public async fetchDeletedProjects(): Promise<Project[] | undefined> {
        try {
            const jwtToken = LocalStorageService.getJwtToken()
            const projects = await HTTPService.get<Project[]>(`projects/deleted`, jwtToken)

            return this.sortProjects(projects)
        }
        catch (e) {
            console.log('Error fetching projects', e)
            return Promise.resolve([])
        }
    }

    public async fetchProjectById(id: string): Promise<Project | undefined> {
        try {
            return HTTPService.get<Project>(`projects/${id}`)
        }
        catch (e) {
            console.log('Error fetching project', e)
            return Promise.resolve(undefined)
        }
    }

    public async updateProject(updatedProject: UpdateProjectDto): Promise<UpdateProjectResult | undefined> {
        try {
            const jwtToken = LocalStorageService.getJwtToken()
            return HTTPService.put(`projects/${updatedProject.id}`, updatedProject, jwtToken)
        } catch (e) {
            console.log('Error deleting project', e)
        }
    }


    public async createProject(createProjectDto: CreateProjectDto): Promise<Project | undefined> {
        try {
            const jwtToken = LocalStorageService.getJwtToken()
            return HTTPService.post<Project>(`projects/create`, createProjectDto, jwtToken)
        }
        catch (e) {
            console.log('Error creating project', e)
        }
    }

    public async deleteProject(id: string): Promise<DeleteProjectResult | undefined> {
        try {
            const jwtToken = LocalStorageService.getJwtToken()
            return HTTPService.delete(`projects/${id}`, jwtToken)
        } catch (e) {
            console.log('Error deleting project', e)
        }
    }

    public async restoreProject(id: string): Promise<RestoreProjectResult | undefined> {
        try {
            const jwtToken = LocalStorageService.getJwtToken()
            return HTTPService.post(`projects/restore/${id}`, {}, jwtToken)
        } catch (e) {
            console.log('Error restoring project', e)
        }
    }

    public sortProjects = (projects: Project[] | undefined) => {
        return projects?.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        );
    }

}

export default new ProjectsService()