import { useState } from "react";
import {
  User,
  Pill,
  Heart,
  Phone,
  AlertCircle,
  Lock,
  Edit2,
  Save,
  ChevronRight,
  Stethoscope,
  Utensils,
  Music,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockPatient } from "@/data/mockData";

export function PatientProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const patient = mockPatient;

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-charcoal mb-2">
              Patient Profile
            </h1>
            <p className="text-medium-gray">
              Manage Margaret's information and care preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm">
              <Lock className="w-4 h-4 text-lavender" />
              <span className="text-medium-gray">Private & Secure</span>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={
                isEditing
                  ? "bg-mint hover:bg-mint/90"
                  : "bg-lavender hover:bg-deep-lavender"
              }
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-card lg:sticky lg:top-24">
              <CardContent className="p-6">
                {/* Profile Photo Placeholder */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-lavender/20 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-lavender" />
                  </div>
                  <h2 className="text-xl font-semibold text-charcoal">
                    {patient.firstName} {patient.lastName}
                  </h2>
                  <p className="text-medium-gray">Age {patient.age}</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-warm-beige rounded-xl">
                    <p className="text-sm text-medium-gray mb-1">Diagnosis</p>
                    <p className="font-medium text-charcoal">
                      {patient.diagnosis}
                    </p>
                    <Badge className="mt-2 bg-lavender/10 text-lavender border-0">
                      {patient.stage}
                    </Badge>
                  </div>

                  <div className="p-4 bg-warm-beige rounded-xl">
                    <p className="text-sm text-medium-gray mb-1">Diagnosed</p>
                    <p className="font-medium text-charcoal">
                      {new Date(patient.diagnosisDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="p-4 bg-soft-coral/10 rounded-xl border border-soft-coral/30">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-soft-coral" />
                      <p className="font-medium text-charcoal">Allergies</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalHistory.allergies.map((allergy) => (
                        <Badge
                          key={allergy}
                          variant="destructive"
                          className="bg-soft-coral"
                        >
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <TabsList className="bg-white p-1 rounded-xl mb-4 flex w-max min-w-full justify-start">
                  <TabsTrigger
                    value="overview"
                    className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="medical"
                    className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
                  >
                    Medical History
                  </TabsTrigger>
                  <TabsTrigger
                    value="medications"
                    className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
                  >
                    Medications
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
                  >
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="emergency"
                    className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
                  >
                    Emergency
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-lavender" />
                      Medical Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalHistory.conditions.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-soft-blue/20 text-charcoal border-0 px-3 py-1"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-4 text-medium-gray">
                      {patient.medicalHistory.notes}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                      <Pill className="w-5 h-5 text-mint" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patient.medications.slice(0, 3).map((med) => (
                        <div
                          key={med.id}
                          className="flex items-center justify-between p-4 bg-warm-beige rounded-xl"
                        >
                          <div>
                            <p className="font-medium text-charcoal">
                              {med.name}
                            </p>
                            <p className="text-sm text-medium-gray">
                              {med.dosage} - {med.frequency}
                            </p>
                          </div>
                          <Badge className="bg-mint/20 text-charcoal border-0">
                            {med.timeOfDay.join(", ")}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-4 text-lavender"
                    >
                      View All Medications
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                      <Heart className="w-5 h-5 text-soft-coral" />
                      Care Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-warm-beige rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Utensils className="w-4 h-4 text-lavender" />
                          <p className="font-medium text-charcoal">
                            Favorite Foods
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {patient.preferences.favoriteFoods
                            .slice(0, 3)
                            .map((food) => (
                              <span
                                key={food}
                                className="text-sm text-medium-gray bg-white px-2 py-1 rounded"
                              >
                                {food}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="p-4 bg-warm-beige rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Music className="w-4 h-4 text-lavender" />
                          <p className="font-medium text-charcoal">
                            Calming Activities
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {patient.preferences.calmingActivities
                            .slice(0, 3)
                            .map((activity) => (
                              <span
                                key={activity}
                                className="text-sm text-medium-gray bg-white px-2 py-1 rounded"
                              >
                                {activity}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical History Tab */}
              <TabsContent value="medical" className="space-y-6">
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-charcoal">
                      Medical History Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-charcoal mb-3">
                        Current Conditions
                      </h4>
                      <div className="space-y-3">
                        {patient.medicalHistory.conditions.map((condition) => (
                          <div
                            key={condition}
                            className="p-4 bg-warm-beige rounded-xl flex items-center justify-between"
                          >
                            <span className="text-charcoal">{condition}</span>
                            <Badge className="bg-lavender/10 text-lavender border-0">
                              Active
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-charcoal mb-3">
                        Known Allergies
                      </h4>
                      <div className="p-4 bg-soft-coral/10 rounded-xl border border-soft-coral/30">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-soft-coral" />
                          <span className="font-medium text-charcoal">
                            Important
                          </span>
                        </div>
                        <ul className="list-disc list-inside text-medium-gray">
                          {patient.medicalHistory.allergies.map((allergy) => (
                            <li key={allergy}>{allergy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-charcoal mb-3">
                        Care Notes
                      </h4>
                      <div className="p-4 bg-warm-beige rounded-xl">
                        <p className="text-medium-gray">
                          {patient.medicalHistory.notes}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medications Tab */}
              <TabsContent value="medications" className="space-y-6">
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-charcoal">
                        Current Medications
                      </CardTitle>
                      <Button
                        size="sm"
                        className="bg-lavender hover:bg-deep-lavender"
                      >
                        <Pill className="w-4 h-4 mr-2" />
                        Add Medication
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patient.medications.map((med) => (
                        <div
                          key={med.id}
                          className="p-5 bg-warm-beige rounded-xl"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-charcoal text-lg">
                                {med.name}
                              </h4>
                              <p className="text-medium-gray">{med.dosage}</p>
                            </div>
                            <Badge className="bg-mint/20 text-charcoal border-0">
                              {med.frequency}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-medium-gray">
                              <span className="font-medium">Time:</span>
                              {med.timeOfDay.join(", ")}
                            </div>
                          </div>
                          {med.instructions && (
                            <p className="mt-3 text-sm text-medium-gray bg-white p-3 rounded-lg">
                              <span className="font-medium">Instructions:</span>{" "}
                              {med.instructions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="bg-white border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-lavender" />
                        Favorite Foods
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {patient.preferences.favoriteFoods.map((food) => (
                          <Badge
                            key={food}
                            className="bg-pale-yellow/50 text-charcoal border-0 px-3 py-2"
                          >
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Music className="w-5 h-5 text-mint" />
                        Calming Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {patient.preferences.calmingActivities.map(
                          (activity) => (
                            <Badge
                              key={activity}
                              className="bg-mint/20 text-charcoal border-0 px-3 py-2"
                            >
                              {activity}
                            </Badge>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-card sm:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <X className="w-5 h-5 text-soft-coral" />
                        Things to Avoid
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {patient.preferences.dislikes.map((dislike) => (
                          <Badge
                            key={dislike}
                            className="bg-soft-coral/20 text-charcoal border-0 px-3 py-2"
                          >
                            {dislike}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-0 shadow-card sm:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal">
                        Daily Routines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {patient.preferences.routines.map((routine, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-warm-beige rounded-xl"
                          >
                            <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-lavender">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-charcoal">{routine}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Emergency Contacts Tab */}
              <TabsContent value="emergency" className="space-y-6">
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                        <Phone className="w-5 h-5 text-soft-coral" />
                        Emergency Contacts
                      </CardTitle>
                      <Button
                        size="sm"
                        className="bg-soft-coral hover:bg-soft-coral/90"
                      >
                        Add Contact
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patient.emergencyContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`p-5 rounded-xl ${
                            contact.isPrimary
                              ? "bg-lavender/10 border-2 border-lavender"
                              : "bg-warm-beige"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-charcoal text-lg">
                                  {contact.name}
                                </h4>
                                {contact.isPrimary && (
                                  <Badge className="bg-lavender text-white border-0">
                                    Primary
                                  </Badge>
                                )}
                              </div>
                              <p className="text-medium-gray mb-3">
                                {contact.relationship}
                              </p>
                              <a
                                href={`tel:${contact.phone}`}
                                className="flex items-center gap-2 text-lavender font-medium hover:underline"
                              >
                                <Phone className="w-4 h-4" />
                                {contact.phone}
                              </a>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-soft-coral/10 border-2 border-soft-coral/30 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-soft-coral flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal text-lg mb-1">
                          Alzheimer's Association Helpline
                        </h4>
                        <p className="text-medium-gray mb-3">
                          24/7 support for caregivers and families affected by
                          Alzheimer's
                        </p>
                        <a
                          href="tel:1-800-272-3900"
                          className="text-xl font-bold text-soft-coral hover:underline"
                        >
                          1-800-272-3900
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
