import {  Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState"
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import { useNavigate } from "react-router";
import ProjectDeletedItem from "./ProjectDeletedItem";

export default function ProjectsRecycleBin() {
  const [projectList, setProjectList] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const toast = useToast();

  const fetchProjects = useCallback(async () => {
    const projects = await ProjectsService.fetchDeletedProjects()
    if (projects && projects?.length !== 0) {
      setProjectList(projects)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])


  const onRestore = async (projectId: string) => {
    const deletedProject = await ProjectsService.restoreProject(projectId)

    toast({
      title: translate(deletedProject ? 'PROJECT_RESTORED' : 'PROJECTED_RESTORE_ERROR'),
      description: translate(deletedProject ? "PROJECT_RESTORED_DESCRIPTION" : "PROJECT_RESTORE_ERROR_DESCRIPTION"),
      status: deletedProject ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    })

    if (deletedProject) {
      setProjectList(projectList.filter(project => project.id !== projectId))
    }
  }

  if (projectList.length === 0 && !isLoading) {
    return <ProjectsEmptyState />
  }

  return (
    <Stack spacing={8}>
      {projectList?.map(project => (
        <ProjectDeletedItem key={project.id} project={project} onRestore={onRestore} />
      ))}
    </Stack>
  )
}