<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Doctor;
use Illuminate\Database\Seeder;

class DepartmentsAndDoctorsSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'name'       => 'Cardiology',
                'icon'       => '❤️',
                'short_desc' => 'Expert care for your heart and cardiovascular system.',
                'description'=> '<p>Our Cardiology department offers comprehensive diagnosis and treatment for all heart-related conditions using the latest technology.</p>',
                'is_active'  => true,
                'sort_order' => 1,
            ],
            [
                'name'       => 'Neurology',
                'icon'       => '🧠',
                'short_desc' => 'Advanced neurological care for brain and nerve disorders.',
                'description'=> '<p>Our Neurology team specializes in disorders of the brain, spinal cord, and peripheral nervous system.</p>',
                'is_active'  => true,
                'sort_order' => 2,
            ],
            [
                'name'       => 'Orthopedics',
                'icon'       => '🦴',
                'short_desc' => 'Comprehensive bone, joint, and muscle care.',
                'description'=> '<p>From fractures to joint replacements, our Orthopedic department delivers precision care and rapid recovery programs.</p>',
                'is_active'  => true,
                'sort_order' => 3,
            ],
            [
                'name'       => 'Pediatrics',
                'icon'       => '👶',
                'short_desc' => 'Specialized healthcare for infants, children & adolescents.',
                'description'=> '<p>Our Pediatric specialists provide compassionate, family-centred care for patients from birth through 18 years of age.</p>',
                'is_active'  => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($departments as $deptData) {
            $dept = Department::firstOrCreate(['name' => $deptData['name']], $deptData);

            // Seed sample doctors per department
            $doctors = $this->doctorsFor($deptData['name']);
            foreach ($doctors as $docData) {
                $educations = $docData['educations'] ?? [];
                unset($docData['educations']);

                $doctor = Doctor::firstOrCreate(
                    ['name' => $docData['name'], 'department_id' => $dept->id],
                    array_merge($docData, ['department_id' => $dept->id])
                );

                if ($doctor->wasRecentlyCreated && count($educations) > 0) {
                    $doctor->educations()->createMany($educations);
                }
            }
        }

        $this->command->info('✅ Departments & Doctors seeded.');
    }

    private function doctorsFor(string $dept): array
    {
        return match ($dept) {
            'Cardiology' => [
                [
                    'name'             => 'Dr. Sarah Mitchell',
                    'designation'      => 'Head of Cardiology',
                    'specialization'   => 'Interventional Cardiology',
                    'experience_years' => 18,
                    'bio'              => '<p>Dr. Mitchell is a board-certified interventional cardiologist with 18+ years of experience in complex coronary interventions.</p>',
                    'is_active'        => true,
                    'sort_order'       => 1,
                    'educations'       => [
                        ['degree' => 'MBBS', 'institution' => 'Harvard Medical School', 'year' => 2002, 'sort_order' => 1],
                        ['degree' => 'MD (Cardiology)', 'institution' => 'Johns Hopkins', 'year' => 2006, 'sort_order' => 2],
                        ['degree' => 'FACC Fellowship', 'institution' => 'Mayo Clinic', 'year' => 2008, 'sort_order' => 3],
                    ],
                ],
                [
                    'name'             => 'Dr. James Okonkwo',
                    'designation'      => 'Senior Consultant',
                    'specialization'   => 'Electrophysiology',
                    'experience_years' => 12,
                    'bio'              => '<p>Dr. Okonkwo specializes in cardiac rhythm disorders and catheter-based ablation procedures.</p>',
                    'is_active'        => true,
                    'sort_order'       => 2,
                    'educations'       => [
                        ['degree' => 'MBBS', 'institution' => 'University of Lagos', 'year' => 2008, 'sort_order' => 1],
                        ['degree' => 'MRCP (UK)', 'institution' => 'Royal College of Physicians', 'year' => 2012, 'sort_order' => 2],
                    ],
                ],
            ],
            'Neurology' => [
                [
                    'name'             => 'Dr. Priya Sharma',
                    'designation'      => 'Chief Neurologist',
                    'specialization'   => 'Stroke & Cerebrovascular Disease',
                    'experience_years' => 15,
                    'bio'              => '<p>Dr. Sharma is an internationally recognised stroke neurologist who has pioneered thrombectomy programs across South Asia.</p>',
                    'is_active'        => true,
                    'sort_order'       => 1,
                    'educations'       => [
                        ['degree' => 'MBBS', 'institution' => 'AIIMS New Delhi', 'year' => 2005, 'sort_order' => 1],
                        ['degree' => 'DM (Neurology)', 'institution' => 'NIMHANS Bangalore', 'year' => 2009, 'sort_order' => 2],
                    ],
                ],
            ],
            'Orthopedics' => [
                [
                    'name'             => 'Dr. Robert Chen',
                    'designation'      => 'Orthopedic Surgeon',
                    'specialization'   => 'Joint Replacement & Sports Medicine',
                    'experience_years' => 20,
                    'bio'              => '<p>Dr. Chen has performed over 3,000 knee and hip replacement surgeries with an outstanding outcome record.</p>',
                    'is_active'        => true,
                    'sort_order'       => 1,
                    'educations'       => [
                        ['degree' => 'MBBS', 'institution' => 'Stanford University', 'year' => 2000, 'sort_order' => 1],
                        ['degree' => 'MS (Orthopaedics)', 'institution' => 'UCSF Medical Center', 'year' => 2004, 'sort_order' => 2],
                        ['degree' => 'FRCS (Orth)', 'institution' => 'Royal College of Surgeons', 'year' => 2006, 'sort_order' => 3],
                    ],
                ],
            ],
            'Pediatrics' => [
                [
                    'name'             => 'Dr. Amara Diallo',
                    'designation'      => 'Consultant Paediatrician',
                    'specialization'   => 'Neonatal & Paediatric Intensive Care',
                    'experience_years' => 10,
                    'bio'              => '<p>Dr. Diallo provides expert neonatal care and leads our PICU with a focus on family-integrated care models.</p>',
                    'is_active'        => true,
                    'sort_order'       => 1,
                    'educations'       => [
                        ['degree' => 'MBChB', 'institution' => 'University of Cape Town', 'year' => 2010, 'sort_order' => 1],
                        ['degree' => 'DCH (Paediatrics)', 'institution' => 'Royal College of Paediatrics', 'year' => 2013, 'sort_order' => 2],
                    ],
                ],
            ],
            default => [],
        };
    }
}
