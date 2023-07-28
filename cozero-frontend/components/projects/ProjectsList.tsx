import { Button, Flex, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState"
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";
import { GiMagnifyingGlass } from "react-icons/all";

export default function ProjectsList() {
    const [projectList, setProjectList] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()
    const toast = useToast();

    const fetchProjects = useCallback(async () => {
        const projects = await ProjectsService.fetchProjects()
        if (projects && projects?.length !== 0) {
            setProjectList(projects)
        }
        setIsLoading(false)
    }, [])

    const searchProjects = useCallback(async () => {
        const projects = await ProjectsService.searchProjects(query)
        if (projects && projects?.length !== 0) {
            setProjectList(projects)
        }
        setIsLoading(false)
    }, [query])

    const clearSearch = useCallback(async () => {
        setQuery('')
        await fetchProjects()
    }, []);

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects]);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const onDelete = async (projectId: string) => {
        const deletedProject = await ProjectsService.deleteProject(projectId)

        toast({
            title: translate(deletedProject ? 'PROJECT_DELETED' : 'PROJECTED_DELETE_ERROR'),
            description: translate(deletedProject ? "PROJECT_DELETED_DESCRIPTION" : "PROJECT_DELETE_ERROR_DESCRIPTION"),
            status: deletedProject ? 'success' : 'error',
            duration: 9000,
            isClosable: true,
        })

        if (deletedProject) {
            setProjectList(projectList.filter(project => project.id !== projectId))
        }
    }

    if (projectList.length === 0 && query.length === 0 && !isLoading) {
        return <ProjectsEmptyState />
    }

    return (
        <Stack spacing={8}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <GiMagnifyingGlass color='gray.300' />
                </InputLeftElement>
                <Input type='text' value={query} onChange={handleQueryChange} />
            </InputGroup>
            <Button colorScheme='blue' onClick={() => searchProjects()}>{translate('SEARCH')}</Button>
            <Button colorScheme='red' onClick={() => clearSearch()}>{translate('SEARCH_CLEAR')}</Button>
            {projectList?.map(project => (
                <ProjectItem key={project.id} project={project} onDelete={onDelete} />
            ))
            }
            {projectList.length === 0 && query.length && !isLoading && <Text>{translate('SEARCH_NO_RESULTS')}</Text>}
            <Flex gap={2} justifyContent='center'>
                <Text>{translate('PROJECTS_FOOTER_CTA')}</Text>
                <Text
                    onClick={() => navigate(`/projects/create`)}
                    cursor='pointer'
                    fontWeight='bold'
                    color='green.500'
                    textAlign='center'
                >
                    {translate('PROJECTS_FOOTER_CTA_BUTTON')}
                </Text>
            </Flex>
        </Stack>
    )
}